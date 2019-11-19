/**
 * Selects a component.
 * @param {Object} state - The current application state.
 * @param {Object} action - The dispatched action.
 */
const select = (state, action) => {
  const { id } = action;

  return { ...state, selected: id };
};

export default select;
