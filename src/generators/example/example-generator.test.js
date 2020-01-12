import ExampleGenerator from './example-generator';

jest.mock('uuid/v4', () => () => 'mock-uuid');

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
          props: {},
        },
      };

      expect(example).toEqual(expected);
    });

    it('should generate a canvas example', () => {
      const example = ExampleGenerator.generate({ name: 'terra-sandbox:Canvas', type: 'element' });

      const expected = {
        id: 'mock-uuid',
        type: 'element',
        value: {
          name: 'terra-sandbox:Canvas',
          props: {
            children: {
              id: 'mock-uuid',
              parent: 'mock-uuid',
              type: 'node',
              value: {
                'mock-uuid': {
                  id: 'mock-uuid',
                  parent: 'mock-uuid',
                  type: 'element',
                  value: {
                    name: 'terra-sandbox:Placeholder',
                    props: {},
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
});
