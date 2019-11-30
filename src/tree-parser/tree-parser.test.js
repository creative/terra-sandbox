import TreeParser from './tree-parser';

jest.mock('uuid/v4', () => () => 'mock-uuid');

describe('Tree Parser', () => {
  describe('replace', () => {
    it('should replace the target node with the specified replacement', () => {
      const root = {
        mock1: {
          id: 'mock1',
          parent: 'root',
          type: 'element',
          value: {
            name: 'terra-sandbox:MockExample',
            props: {
              children: {
                type: 'node',
                value: {
                  mock3: {
                    id: 'mock3',
                    parent: 'mock1',
                    type: 'element',
                    value: {
                      props: {},
                    },
                  },
                },
              },
            },
          },
        },
        mock2: {
          id: 'mock2',
          parent: 'root',
          type: 'element',
          value: {
            name: 'terra-sandbox:MockExample',
            props: {
              children: {
                type: 'element',
                value: {
                  id: 'mock4',
                  parent: 'mock2',
                  props: {},
                },
              },
            },
          },
        },
      };

      const replacement = {
        id: 'mock-replacement',
        type: 'element',
        value: {
          name: 'terra-sandbox:MockReplacement',
          props: {
            prop1: {
              type: 'bool',
            },
          },
        },
      };

      const result = TreeParser.replace(root, 'mock3', replacement);
      console.log(JSON.stringify(result, null, 2));

      const expected = {
        root: {
          mock1: {
            id: 'mock1',
            parent: 'root',
            type: 'element',
            value: {
              name: 'terra-sandbox:MockExample',
              props: {
                children: {
                  type: 'node',
                  value: {
                    mock3: {
                      id: 'mock-replacement',
                      type: 'element',
                      value: {
                        name: 'terra-sandbox:MockReplacement',
                        props: {
                          prop1: {
                            type: 'bool',
                          },
                        },
                      },
                      parent: 'mock1',
                    },
                  },
                },
              },
            },
          },
          mock2: {
            id: 'mock2',
            parent: 'root',
            type: 'element',
            value: {
              name: 'terra-sandbox:MockExample',
              props: {
                children: {
                  type: 'element',
                  value: {
                    props: {},
                  },
                },
              },
            },
          },
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('replaceTarget', () => {
    it('should replace a node', () => {
      const node = { id: 'mock-target-id', type: 'element', parent: 'mock1', value: { name: 'terra-sandbox:Mock', props: {} } };
      const replacement = { id: 'mock-replacement-id', type: 'element', value: { name: 'mock-name', props: { prop1: { type: 'bool' } } } };

      const result = TreeParser.replaceTarget(node, 'mock-target-id', replacement);

      const expected = {
        id: 'mock-replacement-id',
        parent: 'mock1',
        type: 'element',
        value: {
          name: 'mock-name',
          props: {
            prop1: {
              type: 'bool',
            },
          },
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
