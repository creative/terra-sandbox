import uuidv4 from 'uuid/v4';
import plugins from '../../plugins/plugins';

class ExampleGenerator {
  /**
   * Generates an example.
   * @param {Object} config - The example configuration.
   * @returns {Object} - A generated example.
   */
  static generate(config) {
    const { type, parent } = config;

    const id = uuidv4();

    if (type === 'element') {
      return { id, parent, type, value: ExampleGenerator.component(id, config) };
    }

    return { id, parent, type, value: undefined };
  }

  /**
   * Generates an example component.
   * @param {string} id - The example identifier.
   * @param {Object} config - The example configuration.
   */
  static component(id, config) {
    const { name } = config;
    const { props } = plugins[name];

    const properties = ExampleGenerator.properties(id, props);

    return { name, props: properties };
  }

  /**
   * Generates example component properties.
   * @param {string} id - The component identifier.
   * @param {Object} properties - The component property configurations.
   * @returns {Object} - The component properties.
   */
  static properties(id, properties) {
    const props = {};

    Object.keys(properties).forEach((property) => {
      props[property] = ExampleGenerator.property({ id, property: properties[property] });
    });

    return props;
  }

  /**
   * Generates an example property.
   * @param {Object} config - The property configuration.
   * @returns {Object} - A generated property.
   */
  static property(config) {
    const { id, property } = config;
    const { type } = property;

    if (type === 'element') {
      return ExampleGenerator.placeholder(id);
    }

    if (type === 'node') {
      const example = ExampleGenerator.placeholder(id);

      return { type, value: { [example.id]: example } };
    }

    return { type, value: undefined };
  }

  /**
   * Creates a placeholder.
   * @param {string} parent - The parent identifier.
   */
  static placeholder(parent) {
    return ExampleGenerator.generate({ name: 'terra-sandbox:Placeholder', type: 'element', parent });
  }
}

export default ExampleGenerator;
