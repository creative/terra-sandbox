import plugins from '../plugins/plugins';

/**
 * Replaces a component with another component.
 * @param {Object} state - The current application state.
 * @param {Object} action - The dispatched action.
 */
const replace = (state, action) => {
  const { imports, workspace } = state;
  const { id, replacement, dynamicImport } = action;

  const target = workspace[id];
  const component = { ...target, name: replacement, props: {} };

  if (dynamicImport) {
    const { importFrom } = plugins[replacement];
    imports[importFrom] = dynamicImport;
  }

  return { ...state, imports, workspace: { ...workspace, [id]: component } };
};

export default replace;
