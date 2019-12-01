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
      const example = ExampleGenerator.generate({ name: 'terra-sandbox:Placeholder', type: 'element' });

      const expected = {
        id: 'mock-uuid',
        type: 'element',
        value: {
          name: 'terra-sandbox:Placeholder',
          props: {
            expand: {
              type: 'bool',
              value: undefined,
            },
          },
        },
      };

      expect(example).toEqual(expected);
    });

    it('should generate a mock example', () => {
      const example = ExampleGenerator.generate({ name: 'terra-sandbox:Mock', type: 'element' });

      const expected = {
        id: 'mock-uuid',
        type: 'element',
        value: {
          name: 'terra-sandbox:Mock',
          props: {
            children: {
              type: 'node',
              value: {
                'mock-uuid': {
                  id: 'mock-uuid',
                  parent: 'mock-uuid',
                  type: 'element',
                  value: {
                    name: 'terra-sandbox:Placeholder',
                    props: {
                      expand: {
                        type: 'bool',
                        value: undefined,
                      },
                    },
                  },
                },
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
      jest.spyOn(ExampleGenerator, 'property').mockImplementation(({ property }) => property);

      const props = { prop1: {}, prop2: {} };
      const properties = ExampleGenerator.properties('mock-id', props);
      const expected = { prop1: {}, prop2: {} };

      expect(properties).toEqual(expected);
    });
  });

  describe('property', () => {
    it('should generate an element property', () => {
      jest.spyOn(ExampleGenerator, 'generate').mockImplementation(() => 'generated-component');

      const property = ExampleGenerator.property({ id: 'mock-id', property: { type: 'element' } });
      const expected = 'generated-component';

      expect(property).toEqual(expected);
    });

    it('should generate a node property', () => {
      jest.spyOn(ExampleGenerator, 'generate').mockImplementation(() => ({ id: 'mock-id' }));

      const property = ExampleGenerator.property({ id: 'mock-id', property: { type: 'node' } });
      const expected = { type: 'node', value: { 'mock-id': { id: 'mock-id' } } };

      expect(property).toEqual(expected);
    });
  });
});
