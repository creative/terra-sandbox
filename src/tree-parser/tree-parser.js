class TreeParser {
  /**
   * Finds a node.
   * @param {Object} node - A node within the tree.
   * @param {string} target - The target identifier.
   */
  static find(node, target) {
    const { id, type, value } = node;

    if (id === target) {
      return value;
    }

    let found = null;

    if (type === 'element') {
      found = TreeParser.searchElement(node, target);
    } else if (type === 'node') {
      found = TreeParser.searchNode(node, target);
    }

    return found;
  }

  /**
   * Iterates through an element's props to search for the target node.
   * @param {Object} node - A node within the tree.
   * @param {string} target - The target identifier.
   */
  static searchElement(node, target) {
    const { value } = node;
    const { props } = value;

    const properties = Object.keys(props);

    for (let index = 0; index < properties.length; index += 1) {
      const found = TreeParser.find(props[properties[index]], target);

      if (found) {
        return found;
      }
    }

    return null;
  }

  /**
   * Iterates through a node's keys to search for the target.
   * @param {Object} node - The node.
   * @param {string} target - The target identifier.
   */
  static searchNode(node, target) {
    const { value } = node;

    const nodes = Object.keys(value);

    for (let index = 0; index < nodes.length; index += 1) {
      const found = TreeParser.find(value[nodes[index]], target);

      if (found) {
        return found;
      }
    }

    return null;
  }

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
