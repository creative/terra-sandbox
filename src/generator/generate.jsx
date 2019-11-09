import React from 'react';
import plugins from '../plugins/plugins';

class Generate {
  /**
   * Generates a workspace.
   * @param {Object} imports - The available dynamic imports that have been loaded onto the page.
   * @param {Object} config - The workspace configuration.
   */
  static generate(imports, config) {
    const { root } = config;
    const components = root.map((component) => (
      Generate.component(imports, config[component])
    ));

    return <>{components}</>;
  }

  /**
   * Generates the component import reference.
   * @param {Object} imports - The available dynamic imports that have been loaded onto the page.
   * @param {Object} config - The component configuration.
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
   */
  static component(imports, config) {
    const { id, props } = config;

    const Component = Generate.import(imports, config);
    const properties = Generate.properties(props);

    return <Component key={id} id={id} {...properties} />;
  }

  /**
   * Generates a set of properties.
   * @param {Object} properties - The component property configurations.
   */
  static properties(properties) {
    const props = {};

    Object.keys(properties).forEach((property) => {
      const value = Generate.property(properties[property]);

      if (value !== undefined && value !== null) {
        props[property] = value;
      }
    });

    return props;
  }

  /**
   * Generates a property.
   * @param {Object} property - The property to generate.
   */
  static property(property) {
    const { type, value } = property;

    if (type === 'Bool') {
      return value;
    }

    // eslint-disable-next-line no-console
    console.log(`WARNING: Unable to interpret property. ${JSON.stringify(property)}`);

    return undefined;
  }
}

export default Generate;
