import replace from './replace';
import TreeParser from '../../tree-parser/tree-parser';

jest.mock('../../plugins/plugins', () => ({ 'terra-sandbox:Mock': { importFrom: 'terra-sandbox:Mock' } }));

describe('Replace', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should replace a component', () => {
    jest.spyOn(TreeParser, 'replace').mockImplementationOnce(() => 'mock-canvas');

    const action = { id: 'mock', replacement: { value: { name: 'terra-sandbox:Mock' } } };
    const state = { canvas: {}, imports: {} };

    const result = replace(state, action);

    expect(TreeParser.replace).toHaveBeenCalledWith(state.canvas, action.id, action.replacement);
    expect(result).toEqual({ imports: {}, canvas: 'mock-canvas' });
  });

  it('should append dynamic import during a replace if one is provided', () => {
    jest.spyOn(TreeParser, 'replace').mockImplementationOnce(() => 'mock-canvas');

    const action = { id: 'mock', replacement: { value: { name: 'terra-sandbox:Mock' } }, dynamicImport: 'mock-import' };
    const state = { canvas: {}, imports: {} };

    const result = replace(state, action);

    expect(TreeParser.replace).toHaveBeenCalledWith(state.canvas, action.id, action.replacement);
    expect(result).toEqual({ imports: { 'terra-sandbox:Mock': 'mock-import' }, canvas: 'mock-canvas' });
  });
});
