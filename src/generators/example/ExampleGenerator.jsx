import uuidv4 from 'uuid/v4';
import plugins from '../../plugins/plugins';

class ExampleGenerator {
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

  static configuration(name) {
    if (name === 'terra-sandbox:Placeholder') {
      return { props: { expand: { type: 'Bool' } } };
    }

    return plugins[name];
  }

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
