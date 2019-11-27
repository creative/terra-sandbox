import React from 'react';
import plugins from '../../plugins/plugins';

class WorkspaceGenerator {
  /**
   * Generates a workspace.
   * @param {Object} imports - The available dynamic imports that have been loaded onto the page.
   * @param {Object} config - The workspace configuration.
   * @returns {ReactComponent} - A generated react component.
   */
  static generate(imports, config) {
    const { root } = config;

    const components = Object.keys(root).map((component) => (
      WorkspaceGenerator.component(imports, root[component])
    ));

    return <>{components}</>;
  }

  /**
   * Generates the component import reference.
   * @param {Object} imports - The available dynamic imports that have been loaded onto the page.
   * @param {Object} config - The component configuration.
   * @returns {Object|undefined} - A reference to the import.
   */
  static import(imports, config) {
    const { name } = config;

    if (name === 'terra-sandbox:Placeholder') {
      return imports[name];
    }

    const { importFrom, exportType } = plugins[name];

    if (exportType === 'Default') {
      return imports[importFrom].default;
    }

    return undefined;
  }

  /**
   * Generates a component.
   * @param {Object} imports - The available dynamic imports that have been loaded onto the page.
   * @param {Object} config - The component configuration.
   * @return {ReactComponent} - A generated react component.
   */
  static component(imports, config) {
    const { id, props } = config;

    const Component = WorkspaceGenerator.import(imports, config);
    const properties = WorkspaceGenerator.properties(imports, props);

    return <Component key={id} id={id} {...properties} />;
  }

  /**
   * Generates a set of properties.
   * @param {Object} properties - The component property configurations.
   * @returns {Object} - A set of generated properties.
   */
  static properties(imports, properties) {
    const props = {};

    Object.keys(properties).forEach((property) => {
      const value = WorkspaceGenerator.property(imports, properties[property]);

      if (value !== undefined && value !== null) {
        props[property] = value;
      }
    });

    return props;
  }

  /**
   * Generates a property.
   * @param {Object} property - The property to generate.
   * @returns {Object} - A generated property;
   */
  static property(imports, property) {
    const { type, value } = property;

    if (value === undefined) {
      return undefined;
    }

    if (type === 'bool' || type === 'string') {
      return value;
    }

    if (type === 'node') {
      return Object.keys(value).map((node) => WorkspaceGenerator.component(imports, value[node]));
    }

    if (type === 'element') {
      return WorkspaceGenerator.generate(imports, property);
    }

    // eslint-disable-next-line no-console
    console.log(`WARNING: Unable to interpret property. ${JSON.stringify(property)}`);

    return undefined;
  }
}

export default WorkspaceGenerator;
