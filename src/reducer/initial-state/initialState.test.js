import initialState from './initialState';

jest.mock('uuid/v4', () => () => 'mock-uuid');

describe('Initial State ', () => {
  it('should export the placeholder import', () => {
    const { imports } = initialState;

    expect(imports['terra-sandbox:Placeholder']).toBeDefined();
  });

  it('should export the canvas import', () => {
    const { imports } = initialState;

    expect(imports['terra-sandbox:Canvas']).toBeDefined();
  });

  it('should export the selected component as undefined', () => {
    const { selected } = initialState;

    expect(selected).toBeUndefined();
  });

  it('should export an initial canvas', () => {
    const { canvas } = initialState;

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

    expect(canvas).toEqual(expected);
  });
});
