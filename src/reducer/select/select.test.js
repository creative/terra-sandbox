import select from './select';

describe('Select', () => {
  it('should select a component', () => {
    const action = { id: 'mock-id' };
    const state = {};

    const result = select(state, action);

    expect(result.selected).toBe('mock-id');
  });
});
