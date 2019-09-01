/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const DocGen = require('react-docgen');
const Property = require('../property/Property');

const BASE_URL = 'http://engineering.cerner.com/terra-ui/#/components/';

class Component {
  /**
   * Creates an object representation of the component.
   * @param {string} packageName - The component package name.
   * @param {string} name - The component name.
   * @param {Object} config - The component configuration.
   * @returns {Object} - An object representation of the component.
   */
  static create(packageName, name, config) {
    const { sourceFile } = config;

    const { props } = Component.parse(packageName, sourceFile);
    const { version } = Component.packageJSON(packageName);

    return {
      packageName,
      name,
      version,
      description: '',
      documentation: Component.documentationUrl(packageName),
      props: Component.createProperties(packageName, config, props),
    };
  }

  /**
   * Creates an object representation of the component properties.
   * @param {string} packageName - The component package name.
   * @param {Object} config - The component configuration.
   * @param {Object} props - The react-docgen props object.
   * @returns {Object} - An Object representation of the component properties.
   */
  static createProperties(packageName, config, props) {
    const { ignoredProperties = [] } = config;

    const properties = {};

    Object.keys(props).forEach((prop) => {
      if (ignoredProperties.indexOf(prop) === -1) {
        properties[prop] = Property.create(packageName, prop, props[prop]);
      }
    });

    return properties;
  }

  /**
   * Creates a documentation URL.
   * @param {string} packageName - The component package name.
   * @returns {string} - A documentation URL.
   */
  static documentationUrl(packageName) {
    return `${BASE_URL}${packageName}/${packageName.replace('terra-', '')}`;
  }

  /**
   * Retrieves the package JSON file.
   * @param {string} packageName - The package name.
   * @returns {Object} - The package JSON.
   */
  static packageJSON(packageName) {
    return JSON.parse(fs.readFileSync(`node_modules/${packageName}/package.json`));
  }

  /**
   * Invokes the react-docgen parser on the specified file.
   * @param {string} packageName - The component package name.
   * @param {string} sourceFile - The component source file.
   * @returns {Object} - The parsed source file DocGen configuration.
   */
  static parse(packageName, sourceFile) {
    return DocGen.parse(fs.readFileSync(`node_modules/${packageName}${sourceFile}`));
  }
}

module.exports = Component;
