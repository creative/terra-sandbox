import replace from './replace';
import ExampleGenerator from '../../generators/example/example-generator';
import TreeParser from '../../tree-parser/tree-parser';

jest.mock('uuid/v4', () => () => 'mock-uuid');
jest.mock('../../plugins/plugins', () => ({
  'terra-sandbox:Mock': {
    packageName: 'terra-sandbox',
    name: 'Mock',
    version: '1.0.0',
    importFrom: 'terra-sandbox',
    props: {
      children: {
        type: 'node',
      },
    },
  },
}));

describe('Replace', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should replace a component', () => {
    jest.spyOn(TreeParser, 'replace');
    jest.spyOn(ExampleGenerator, 'generate');

    const action = { id: 'mock', replacement: 'terra-sandbox:Mock' };

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
            name: 'terra-sandbox:Mock',
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

    expect(ExampleGenerator.generate).toHaveBeenCalledWith('terra-sandbox:Mock', 'mock');
    expect(TreeParser.replace).toHaveBeenCalledWith(state.workspace.root, action.id, expect.any(Object));
    expect(result).toEqual(expected);
  });

  it('should append dynamic import during a replace as strange as that sounds', () => {
    jest.spyOn(TreeParser, 'replace').mockImplementationOnce(() => { });
    jest.spyOn(ExampleGenerator, 'generate').mockImplementationOnce(() => { });

    const action = { id: 'mock', replacement: 'terra-sandbox:Mock', dynamicImport: 'terra-sandbox' };

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

    const expected = { default: 'default-import', 'terra-sandbox': 'terra-sandbox' };

    const { imports } = replace(state, action);

    expect(imports).toEqual(expected);
  });
});
