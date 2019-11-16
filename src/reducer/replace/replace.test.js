import replace from './replace';
import ExampleGenerator from '../../generators/example/example-generator';
import TreeParser from '../../tree-parser/tree-parser';

jest.mock('uuid/v4', () => () => 'mock-uuid');

describe('Replace', () => {
  it('should replace a component', () => {
    jest.spyOn(TreeParser, 'replace');
    jest.spyOn(ExampleGenerator, 'generate');

    const action = { id: 'mock', replacement: 'terra-card:Card' };

    const state = {
      workspace: {
        root: {
          mock: {
            id: 'mock',
            parent: 'root',
            name: 'terra-sandbox:Placeholder',
            type: 'element',
            props: {
              expand: {
                type: 'Bool',
                value: true,
              },
            },
          },
        },
      },
    };

    const expected = {
      workspace: {
        root: {
          mock: {
            id: 'mock',
            name: 'terra-card:Card',
            parent: 'root',
            type: 'element',
            props: {
              children: {
                type: 'node',
                value: {
                  'mock-uuid': {
                    id: 'mock-uuid',
                    name: 'terra-sandbox:Placeholder',
                    parent: 'mock',
                    type: 'element',
                    props: {},
                  },
                },
              },
            },
          },
        },
      },
    };

    const result = replace(state, action);

    expect(ExampleGenerator.generate).toHaveBeenCalledWith('terra-card:Card', 'mock');
    expect(TreeParser.replace).toHaveBeenCalledWith(state.workspace.root, action.id, expect.any(Object));
    expect(result).toEqual(expected);
  });

  it('should append dynamic import during a replace as strange as that sounds', () => {
    jest.spyOn(TreeParser, 'replace').mockImplementationOnce(() => { });
    jest.spyOn(ExampleGenerator, 'generate').mockImplementationOnce(() => { });

    const action = { id: 'mock', replacement: 'terra-card:Card', dynamicImport: 'terra-card' };

    const state = {
      imports: {
        default: 'default-import',
      },
      workspace: {
        root: {
          mock: {},
        },
      },
    };

    const expected = { default: 'default-import', 'terra-card': 'terra-card' };

    const { imports } = replace(state, action);

    expect(imports).toEqual(expected);
  });
});
