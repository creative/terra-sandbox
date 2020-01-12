import uuidv4 from 'uuid/v4';
import plugins from '../../plugins/plugins';

class ExampleGenerator {
  /**
   * Generates an example object for a provided configuration.
   * @param {Object} config - The example configuration.
   * @returns {Object} - A generated example.
   */
  static generate(config) {
    const { type, parent } = config;

    let value;
    const id = uuidv4();

    if (type === 'element') {
      value = ExampleGenerator.element({ ...config, id });
    } else if (type === 'node') {
      value = ExampleGenerator.node({ ...config, id });
    }

    return { id, parent, type, value };
  }

  /**
   * Generates an example object representation of a react element.
   * @param {Object} config - The example configuration.
   * @returns {Object} - An Object representation of a react element.
   */
  static element(config) {
    const { id, name = 'terra-sandbox:Placeholder' } = config;
    const { props } = plugins[name];

    const properties = {};

    Object.keys(props).forEach((property) => {
      properties[property] = ExampleGenerator.generate({ ...props[property], parent: id });
    });

    return { name, props: properties };
  }

  /**
   * Generates an example object representation for a node datatype.
   * @param {Object} config - The example configuration.
   * @returns {Object} - An Object representation of the node.
   */
  static node(config) {
    const { id } = config;
    const placeholder = ExampleGenerator.generate({ parent: id, type: 'element' });

    return { [placeholder.id]: placeholder };
  }
}

export default ExampleGenerator;
