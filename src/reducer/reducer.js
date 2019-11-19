import initialState from './initial-state/initialState';
import replace from './replace/replace';
import select from './select/select';

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case 'replace':
      return replace(state, action);
    case 'select':
      return select(state, action);
    default:
      // eslint-disable-next-line no-console
      console.log('WARNING: No reducer action was specified.');
      return state;
  }
};

export default reducer;
export { initialState };
