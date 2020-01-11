class TreeParser {
  /**
   * Replaces a node.
   * @param {Object} node - A node.
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
   * Iterates through the element node props and replaces the target.
   * @param {Object} node - The node.
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
   * Iterates through the node keys and replaces the target.
   * @param {Object} node - The node.
   * @param {string} target - The target identifier.
   * @param {Object} replacement - The replacement node.
   */
  static replaceNode(node, target, replacement) {
    const { id, parent, type, value } = node;

    const nodes = {};

    Object.keys(value).forEach((key) => {
      const replacementNode = TreeParser.replace(value[key], target, replacement);

      nodes[replacementNode.id] = replacementNode;
    });

    return { id, parent, type, value: nodes };
  }
}

export default TreeParser;
