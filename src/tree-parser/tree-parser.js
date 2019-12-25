class TreeParser {
  /**
   * Replaces a target node within the tree.
   * @param {Object} node - The current node within the tree.
   * @param {string} target - The target identifier.
   * @param {Object} replacement - The replacement node.
   */
  static replace(node, target, replacement) {
    const { id, parent, type } = node;

    if (id === target) {
      return { ...replacement, parent };
    }

    if (type === 'element') {
      return TreeParser.replaceElement(node, target, replacement);
    }

    if (type === 'node') {
      return TreeParser.replaceNode(node, target, replacement);
    }

    return node;
  }

  /**
   * Replaces an element node within a tree.
   * @param {Object} node - The element node.
   * @param {string} target - The target identifier.
   * @param {Object} replacement - The replacement node.
   */
  static replaceElement(node, target, replacement) {
    const { id, parent, type, value } = node;
    const { name, props } = value;

    const properties = {};

    Object.keys(props).forEach((prop) => {
      properties[prop] = TreeParser.replace(props[prop], target, replacement);
    });

    return { id, parent, type, value: { name, props: properties } };
  }

  /**
   * Replaces a node node within a tree.
   * @param {Object} node - The element node.
   * @param {string} target - The target identifier.
   * @param {Object} replacement - The replacement node.
   */
  static replaceNode(node, target, replacement) {
    const { id, parent, type, value } = node;

    const nodes = {};

    Object.keys(value).forEach((key) => {
      nodes[key] = TreeParser.replace(value[key], target, replacement);
    });

    return { id, parent, type, value: nodes };
  }
}

export default TreeParser;
