import initialState from './initialState';

jest.mock('uuid/v4', () => () => 'mock-uuid');

describe('Initial State ', () => {
  it('should export the expected initial workspace state', () => {
    const { workspace } = initialState;

    const expected = {
      root: {
        'mock-uuid': {
          id: 'mock-uuid',
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
    };

    expect(workspace).toEqual(expected);
  });

  it('should export the expected initial placeholder import', () => {
    const { imports } = initialState;

    expect(imports['terra-sandbox:Placeholder']).toBeDefined();
  });
});
