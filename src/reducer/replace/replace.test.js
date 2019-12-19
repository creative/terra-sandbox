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
  'terra-sandbox:Placeholder': {
    packageName: 'terra-sandbox',
    name: 'Placeholder',
    props: {
      expand: {
        type: 'bool',
        required: false,
      },
    },
    key: 'terra-sandbox:Placeholder',
    exportType: 'Default',
    importFrom: 'Placeholder',
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

    const action = { id: 'mock', replacement: { name: 'terra-sandbox:Mock', type: 'element' } };

    const state = {
      workspace: {
        root: {
          mock: {
            id: 'mock',
            parent: 'root',
            type: 'element',
            value: {
              name: 'terra-sandbox:Placeholder',
              props: {
                expand: {
                  type: 'bool',
                  value: true,
                },
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
            id: 'mock-uuid',
            parent: 'root',
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
          },
        },
      },
    };

    const result = replace(state, action);

    expect(ExampleGenerator.generate).toHaveBeenCalledWith({ name: 'terra-sandbox:Mock', type: 'element' });
    expect(TreeParser.replace).toHaveBeenCalledWith(state.workspace.root, action.id, expect.any(Object));
    expect(result).toEqual(expected);
  });

  it('should append dynamic import during a replace as strange as that sounds', () => {
    jest.spyOn(TreeParser, 'replace').mockImplementationOnce(() => { });
    jest.spyOn(ExampleGenerator, 'generate').mockImplementationOnce(() => { });

    const action = { id: 'mock', replacement: { name: 'terra-sandbox:Mock', type: 'element' }, dynamicImport: 'terra-sandbox' };

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
