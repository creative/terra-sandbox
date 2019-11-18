import TreeParser from './tree-parser';

jest.mock('uuid/v4', () => () => 'mock-uuid');

describe('Tree Parser', () => {
  describe('replace', () => {
    it('should replace the target node with the specified replacement', () => {
      const root = {
        mock1: {
          id: 'mock1',
          props: {
            children: {
              type: 'node',
              value: {
                mock3: {
                  id: 'mock3',
                  parent: 'mock1',
                  props: {},
                },
              },
            },
          },
        },
        mock2: {
          id: 'mock2',
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
      };

      const replacement = {
        name: 'replacement',
        props: { prop1: { type: 'bool' } },
      };

      const result = TreeParser.replace(root, 'mock3', replacement);

      const expected = {
        root: {
          mock1: {
            id: 'mock1',
            props: {
              children: {
                type: 'node',
                value: {
                  mock3: {
                    id: 'mock3',
                    parent: 'mock1',
                    name: 'replacement',
                    type: 'element',
                    props: { prop1: { type: 'bool' } },
                  },
                },
              },
            },
          },
          mock2: {
            id: 'mock2',
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

      expect(result).toEqual(expected);
    });
  });

  describe('replaceNode', () => {
    it('should replace a node', () => {
      const node = { id: 'mock-target-id', parent: 'mock1', props: {} };

      const replacement = { name: 'mock-name', props: { prop1: { type: 'bool' } } };

      const result = TreeParser.replaceNode(node, 'mock-target-id', replacement);

      const expected = {
        name: 'mock-name',
        id: 'mock-target-id',
        parent: 'mock1',
        type: 'element',
        props: { prop1: { type: 'bool' } },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('clone', () => {
    it('should clone a node with a specified parent and identifier', () => {
      const node = {
        id: 'mock-target-id',
        parent: 'mock1',
        name: 'mock-name',
        props: {},
      };

      const result = TreeParser.clone(node, 'parent-id', 'mock-id');

      const expected = {
        name: 'mock-name',
        id: 'mock-id',
        parent: 'parent-id',
        type: 'element',
        props: {},
      };

      expect(result).toEqual(expected);
    });
  });
});
