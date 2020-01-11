import plugins from '../../plugins/plugins';
import TreeParser from '../../tree-parser/tree-parser';

/**
 * Replaces a component with another component.
 * @param {Object} state - The current application state.
 * @param {Object} action - The dispatched action.
 */
const replace = (state, action) => {
  const { imports, canvas } = state;
  const { id, replacement, dynamicImport } = action;

  // Replace actions may optionally introduce a new dynamic import.
  if (dynamicImport) {
    const { value } = replacement;
    const { name } = value;
    const { importFrom } = plugins[name];

    imports[importFrom] = dynamicImport;
  }

  const canvasTree = TreeParser.replace(canvas, id, replacement);

  return { ...state, imports, canvas: canvasTree };
};

export default replace;
