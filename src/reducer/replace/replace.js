import plugins from '../../plugins/plugins';
import TreeParser from '../../tree-parser/tree-parser';
import ExampleGenerator from '../../generators/example/example-generator';

/**
 * Replaces a component with another component.
 * @param {Object} state - The current application state.
 * @param {Object} action - The dispatched action.
 */
const replace = (state, action) => {
  const { imports, canvas } = state;
  const { id, replacement, dynamicImport } = action;

  // Preserve the existing ID for replacements.
  const component = ExampleGenerator.generate(replacement);
  const tree = TreeParser.replace(canvas, id, component);

  // Replace actions may optionally introduce a new dynamic import.
  if (dynamicImport) {
    const { name } = replacement;
    const { importFrom } = plugins[name];

    imports[importFrom] = dynamicImport;
  }

  return { ...state, imports, canvas: tree };
};

export default replace;
