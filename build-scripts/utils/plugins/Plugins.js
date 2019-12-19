/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const Component = require('../component/Component');
const Format = require('../format/Format');
const placeholder = require('../../../plugins/terra-sandbox/components/placeholder/Placeholder.json');

const ROOT_DIR = process.cwd();
const PLUGINS_DIR = `${ROOT_DIR}/plugins/`;
const PLUGINS_FILE = `${ROOT_DIR}/src/plugins/plugins.json`;
const IMPORTS_FILE = `${ROOT_DIR}/src/plugins/imports.js`;

/**
 * Supported export types.
 * Default - The default export of a package.
 * Custom - A custom package import. Generally requires importing a component directly from lib.
 * Export - A keyed export from the main package file.
 * Subcomponent - A subcomponent. Accessed from dot notation. Ex: Select.Option.
 */
const ExportTypes = {
  Default: 'Default',
  Custom: 'Custom',
  Export: 'Export',
  Subcomponent: 'Subcomponent',
};

class Plugins {
  /**
   * Retrieves the plugin configuration.
   * @param {string} packageName - The component package name.
   * @returns {Object} - The package configuration.
   */
  static config(packageName) {
    const configFilePath = `${PLUGINS_DIR}${packageName}/config.json`;

    if (fs.existsSync(configFilePath)) {
      return JSON.parse(fs.readFileSync(configFilePath));
    }

    return {
      defaultExport: {
        sourceFile: `/src/${Format.titleize(packageName)}.jsx`,
      },
    };
  }

  /**
   * Creates the plugin configuration.
   * @param {string} packageName - The plugin package name.
   * @returns {Object} - The plugin configuration object.
   */
  static create(packageName, config = {}, exportType) {
    const components = {};

    Object.keys(config).forEach((name) => {
      const key = Plugins.key(packageName, name);
      const component = Component.create(packageName, name, config[name]);
      const subcomponents = Plugins.createSubcomponents(packageName, config[name].subcomponents, name);
      const componentExports = Plugins.createComponentExports(packageName, config[name].componentExports, name);

      component.key = key;
      component.exportType = exportType;
      component.importFrom = config[name].importFrom || packageName;
      component.subcomponents = Object.keys(subcomponents);
      component.componentExports = Object.keys(componentExports);
      components[key] = component;

      Object.assign(components, subcomponents, componentExports);
    });

    return components;
  }

  /**
   * Creates the component export configurations.
   * @param {string} packageName - The package name.
   * @param {Object} componentExports - The component exports of the parent.
   * @param {string} parent - The parent component name.
   * @returns {Object} - A key value pair of exports.
   */
  static createComponentExports(packageName, componentExports = {}, parent) {
    const components = {};

    Object.keys(componentExports).forEach((name) => {
      const key = Plugins.key(packageName, name, parent);
      const component = Component.create(packageName, name, componentExports[name]);

      component.key = key;
      component.parent = Plugins.key(packageName, parent);
      component.exportType = ExportTypes.Export;

      components[key] = component;
    });

    return components;
  }

  /**
   * Creates the subcomponents configurations of an export.
   * @param {string} packageName - The package name.
   * @param {Object} subcomponents - The subcomponents of the parent.
   * @param {string} parent - The parent component name.
   * @returns {Object} - A key value pair of exports.
   */
  static createSubcomponents(packageName, subcomponents = {}, parent) {
    const components = {};

    Object.keys(subcomponents).forEach((name) => {
      const key = Plugins.key(packageName, name, parent);
      const component = Component.create(packageName, name, subcomponents[name]);

      component.key = key;
      component.parent = Plugins.key(packageName, parent);
      component.exportType = ExportTypes.Subcomponent;

      components[key] = component;
    });

    return components;
  }

  /**
   * Retrieves the file destination of the generated plugin component.
   * @param {string} packageName - The component package name.
   * @param {string} name - The component name.
   * @param {string} parent - The component parent name.
   * @returns {string} - The file destination.
   */
  static destination(packageName, name, parent) {
    const directory = parent ? `${parent}-${name}` : name;
    return `${PLUGINS_DIR}${packageName}/components/${Format.hyphenize(directory)}/${name}.json`;
  }

  /**
   * Generates a configuration of plugins.
   * @param {array} plugins - An array of plugins.
   */
  static generate(plugins) {
    const config = {};

    plugins.forEach((plugin) => {
      const { defaultExport, customExports } = Plugins.config(plugin);

      if (defaultExport) {
        // Convert the default export into a keyed object.
        const { name = Format.titleize(plugin) } = defaultExport;
        const defaultExportConfig = { [name]: defaultExport };

        Object.assign(config, Plugins.create(plugin, defaultExportConfig, ExportTypes.Default));
      }

      Object.assign(config, Plugins.create(plugin, customExports, ExportTypes.Custom));
    });

    Plugins.writeFiles(config);
  }

  /**
   * Creates a unique key for a component.
   * @param {string} packageName - The package name.
   * @param {string} name - The name of the component.
   * @param {string} parent - The parent of the component.
   * @returns {string} - A unique configuration key.
   */
  static key(packageName, name, parent) {
    if (parent) {
      return `${packageName}:${parent}:${name}`;
    }

    return `${packageName}:${name}`;
  }

  /**
   * Writes a json blob to a file.
   * @param {string} fileName - The file name to write to.
   * @param {Object} blob - The JSON object.
   * @param {number} space - Optional space delimitation.
   */
  static writeFile(fileName, blob, space = 2) {
    const dirname = path.dirname(fileName);

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }

    fs.writeFileSync(fileName, `${JSON.stringify(blob, null, space)}\n`);
  }

  /**
   * Writes the plugin configurations to the file system.
   * @param {Object} config - The entire configuration of generated plugins.
   */
  static writeFiles(config) {
    const imports = new Set();

    Object.keys(config).forEach((key) => {
      const component = config[key];

      const { importFrom, packageName, name, parent } = component;
      const { name: parentName, importFrom: parentImport } = config[parent] || {};

      imports.add(parentImport || importFrom);

      const destination = Plugins.destination(packageName, name, parentName);

      Plugins.writeFile(destination, component);
    });

    const importMap = [...imports].map((key) => `  '${key}': () => import('${key}')`);
    const importsFile = `export default {\n${importMap.join(',\n')},\n};\n`;

    // Add the custom terra-sandbox components.
    // Must be added after the imports are generated to prevent cycle dependencies.
    const mergedConfig = { ...config };
    mergedConfig['terra-sandbox:Placeholder'] = placeholder;

    fs.writeFileSync(IMPORTS_FILE, importsFile);
    Plugins.writeFile(PLUGINS_FILE, mergedConfig, null);
  }
}

module.exports = Plugins;
