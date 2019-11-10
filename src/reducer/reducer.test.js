/* eslint-disable no-console */
import replace from './replace';
import reducer, { initialState } from './reducer';

jest.mock('./replace');

describe('Reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should export the initial reducer state', () => {
    expect(initialState).toBeDefined();
  });

  it('should call the replace reducer when the replace action is called', () => {
    const state = {};
    const action = { type: 'replace' };

    reducer(state, action);

    expect(replace).toHaveBeenCalled();
  });

  it('should return the current state when an invalid action is invoked', () => {
    const state = { mock: 'mock' };
    const action = { type: 'invalid' };

    jest.spyOn(console, 'log');

    const result = reducer(state, action);

    expect(result).toEqual(state);
    expect(console.log).toHaveBeenCalledWith('WARNING: No reducer action was specified.');
  });
});
