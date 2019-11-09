import replace from './replace';
import initialState from './initialState';

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case 'replace':
      return replace(state, action);
    default:
      // eslint-disable-next-line no-console
      console.log('WARNING: No reducer action was specified.');
      return state;
  }
};

export default reducer;
export { initialState };
