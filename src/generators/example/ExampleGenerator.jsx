import uuidv4 from 'uuid/v4';
import plugins from '../../plugins/plugins';

class ExampleGenerator {
  /**
   * Generates a example for a component.
   * @param {string} name - The component name.
   * @param {string} id - The component identifier.
   * @param {string} parent - The parent identifier.
   * @returns {Object} - A generated react component represented as a Object.
   */
  static generate(name, id, parent) {
    const identifier = id || uuidv4();
    const { props } = ExampleGenerator.configuration(name);

    return {
      id: identifier,
      parent,
      name,
      type: 'element',
      props: ExampleGenerator.properties(id, props),
    };
  }

  /**
   * Fetches the component configuration object.
   * @param {string} name - The component name.
   * @returns {Object} - The component configuration.
   */
  static configuration(name) {
    if (name === 'terra-sandbox:Placeholder') {
      return { props: { expand: { type: 'Bool' } } };
    }

    return plugins[name];
  }

  /**
   * Generates the example properties.
   * @param {string} id - The component identifier.
   * @param {Object} properties - The component properties.
   * @returns {Object} - The component properties.
   */
  static properties(id, properties) {
    const props = {};

    Object.keys(properties).forEach((property) => {
      const value = ExampleGenerator.property(id, properties[property]);

      if (value !== undefined && value !== null) {
        props[property] = value;
      }
    });

    return props;
  }

  /**
   * Generates an example property.
   * @param {string} id - The component identifier.
   * @param {Object} property - The property to generate.
   * @returns {Object} - A generated property.
   */
  static property(id, property) {
    const { type } = property;

    if (type === 'element') {
      return ExampleGenerator.generate('terra-sandbox:Placeholder', null, id);
    }

    if (type === 'node') {
      const example = ExampleGenerator.generate('terra-sandbox:Placeholder', null, id);

      return { type: 'node', value: { [example.id]: example } };
    }

    return undefined;
  }
}

export default ExampleGenerator;
