import ExampleGenerator from './example-generator';

jest.mock('uuid/v4', () => () => 'mock-uuid');
jest.mock('../../plugins/plugins', () => ({
  'terra-sandbox:Mock': {
    packageName: 'terra-sandbox',
    name: 'Mock',
    version: '1.0.0',
    props: {
      children: {
        type: 'node',
      },
    },
  },
}));

describe('Example Generator', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('generate', () => {
    it('should generate a placeholder example', () => {
      const example = ExampleGenerator.generate('terra-sandbox:Placeholder');

      const expected = {
        id: 'mock-uuid',
        name: 'terra-sandbox:Placeholder',
        parent: undefined,
        props: {},
        type: 'element',
      };

      expect(example).toEqual(expected);
    });

    it('should generate a placeholder example with a specified id', () => {
      const example = ExampleGenerator.generate('terra-sandbox:Placeholder', 'mock');

      const expected = {
        id: 'mock',
        name: 'terra-sandbox:Placeholder',
        parent: undefined,
        props: {},
        type: 'element',
      };

      expect(example).toEqual(expected);
    });

    it('should generate a placeholder example with a specified id and parent', () => {
      const example = ExampleGenerator.generate('terra-sandbox:Placeholder', 'mock', 'mock-parent');

      const expected = {
        id: 'mock',
        name: 'terra-sandbox:Placeholder',
        parent: 'mock-parent',
        props: {},
        type: 'element',
      };

      expect(example).toEqual(expected);
    });

    it('should generate a card example', () => {
      const example = ExampleGenerator.generate('terra-sandbox:Mock');

      const expected = {
        id: 'mock-uuid',
        name: 'terra-sandbox:Mock',
        type: 'element',
        props: {
          children: {
            type: 'node',
            value: {
              'mock-uuid': {
                id: 'mock-uuid',
                parent: 'mock-uuid',
                name: 'terra-sandbox:Placeholder',
                type: 'element',
                props: {},
              },
            },
          },
        },
      };

      expect(example).toEqual(expected);
    });
  });

  describe('configuration', () => {
    it('should return the placeholder configuration', () => {
      const configuration = ExampleGenerator.configuration('terra-sandbox:Placeholder');
      const expected = { props: { expand: { type: 'bool' } } };

      expect(configuration).toEqual(expected);
    });

    it('should return the requested configuration', () => {
      const configuration = ExampleGenerator.configuration('terra-sandbox:Mock');
      const expected = {
        packageName: 'terra-sandbox',
        name: 'Mock',
        version: '1.0.0',
        props: {
          children: {
            type: 'node',
          },
        },
      };

      expect(configuration).toEqual(expected);
    });
  });

  describe('properties', () => {
    it('should generate each property', () => {
      jest.spyOn(ExampleGenerator, 'property').mockImplementation((_id, property) => property);

      const props = { prop1: {}, prop2: {} };
      const properties = ExampleGenerator.properties('mock-id', props);
      const expected = { prop1: {}, prop2: {} };

      expect(properties).toEqual(expected);
    });
  });

  describe('property', () => {
    it('should generate an element property', () => {
      jest.spyOn(ExampleGenerator, 'generate').mockImplementation(() => 'generated-component');

      const property = ExampleGenerator.property('mock-id', { type: 'element' });
      const expected = 'generated-component';

      expect(property).toEqual(expected);
    });

    it('should generate a node property', () => {
      jest.spyOn(ExampleGenerator, 'generate').mockImplementation(() => ({ id: 'mock-id' }));

      const property = ExampleGenerator.property('mock-id', { type: 'node' });
      const expected = { type: 'node', value: { 'mock-id': { id: 'mock-id' } } };

      expect(property).toEqual(expected);
    });
  });
});
