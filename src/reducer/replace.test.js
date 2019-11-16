import replace from './replace';

jest.mock('../plugins/plugins', () => (
  { 'terra-sandbox:Mock': { importFrom: 'mock-import' } }
));

describe('Replace', () => {
  it('should replace a component', () => {
    const action = {
      id: 'mock',
      replacement: 'terra-sandbox:Mock',
    };

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
            parent: 'root',
            name: 'terra-sandbox:Mock',
            type: 'element',
            props: {},
          },
        },
      },
    };

    const result = replace(state, action);

    expect(result).toEqual(expected);
  });

  it('should append dynamic import during a replace as strange as that sounds', () => {
    const action = { id: 'mock', replacement: 'terra-sandbox:Mock', dynamicImport: 'mock-import' };

    const state = {
      imports: {
        default: 'default-import',
      },
      workspace: {
        mock: {},
      },
    };

    const expected = { default: 'default-import', 'mock-import': 'mock-import' };

    const { imports } = replace(state, action);

    expect(imports).toEqual(expected);
  });
});
