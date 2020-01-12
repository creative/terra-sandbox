import React from 'react';
import plugins from '../../plugins/plugins';

class CanvasGenerator {
  /**
   * Generates a renderable component from a configuration.
   * @param {Object} imports - The available dynamic imports that have been loaded onto the page.
   * @param {Object} config - The object representation of the renderable object.
   * @returns {ReactElement|string|number|array} - A renderable component.
   */
  static generate(imports, config) {
    const { type, value } = config;

    if (type === 'element') {
      return CanvasGenerator.element(imports, config);
    }

    if (type === 'node') {
      return CanvasGenerator.node(imports, config);
    }

    return value;
  }

  /**
   * Returns the import reference for creating the component.
   * @param {Object} imports - The available dynamic imports that have been loaded onto the page.
   * @param {Object} config - The component configuration.
   * @returns {Object|undefined} - A reference to the import.
   */
  static import(imports, config) {
    const { name } = config;
    const { importFrom, exportType } = plugins[name];

    if (name === 'terra-sandbox:Placeholder' || name === 'terra-sandbox:Canvas') {
      return imports[importFrom];
    }

    if (exportType === 'Default') {
      return imports[importFrom].default;
    }

    return undefined;
  }

  /**
   * Creates a renderable react element for a given configuration.
   * @param {Object} imports - The available dynamic imports that have been loaded onto the page.
   * @param {Object} config - The element configuration.
   * @return {ReactElement} - A react element.
   */
  static element(imports, config) {
    const { id, value } = config;
    const { props } = value;

    const properties = {};
    const Component = CanvasGenerator.import(imports, value);

    Object.keys(props).forEach((property) => {
      const propertyValue = CanvasGenerator.generate(imports, props[property]);

      if (propertyValue !== undefined && propertyValue !== null) {
        properties[property] = propertyValue;
      }
    });

    return <Component key={id} id={id} {...properties} />;
  }

  /**
   * Generates the renderable items for a given node configuration.
   * @param {Object} imports - The available dynamic imports that have been loaded onto the page.
   * @param {Object} config - The node configuration.
   * @return {ReactElement|string|number|array} - The renderable items for a node datatype.
   */
  static node(imports, config) {
    const { value } = config;

    const keys = Object.keys(value);

    if (keys.length === 0) {
      return undefined;
    }

    if (keys.length === 1) {
      return CanvasGenerator.generate(imports, value[keys[0]]);
    }

    return keys.map((key) => CanvasGenerator.generate(imports, value[key]));
  }
}

export default CanvasGenerator;
