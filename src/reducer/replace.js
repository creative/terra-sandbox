import plugins from '../plugins/plugins';
import TreeParser from '../tree-parser/tree-parser';
import ExampleGenerator from '../generators/example/ExampleGenerator';

/**
 * Replaces a component with another component.
 * @param {Object} state - The current application state.
 * @param {Object} action - The dispatched action.
 */
const replace = (state, action) => {
  const { imports, workspace } = state;
  const { root } = workspace;
  const { id, replacement, dynamicImport } = action;

  // Preserve the existing ID for replacements.
  const component = ExampleGenerator.generate(replacement, id);
  const tree = TreeParser.replace(root, id, component);

  // Replace actions may optionally introduce a new dynamic import.
  if (dynamicImport) {
    const { importFrom } = plugins[replacement];
    imports[importFrom] = dynamicImport;
  }

  return { ...state, imports, workspace: tree };
};

export default replace;

// replace, remove, insert
