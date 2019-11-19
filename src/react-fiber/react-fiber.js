class Fiber {
  /**
   * Finds the nearest component to the click target.
   * @param {DOMNode} node - The origin node.
   * @returns {string|null} - The key of the nearest component. Null if not found.
   */
  static findNearest(node) {
    if (node.id === 'root') {
      return node.id;
    }

    let target = Fiber.fiberNode(node);

    while (target && !Fiber.match(target.key)) {
      target = target.return;
    }

    if (target) {
      return Fiber.match(target.key);
    }

    return null;
  }

  /**
   * Returns true if the key matches a UUID regex.
   * @param {string} string - The string to match.
   * @returns {string|null} - A UUID. Null if no match is found.
   */
  static match(key) {
    const match = `${key}`.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);

    if (match) {
      return match[0];
    }

    return null;
  }

  /**
   * Returns the associated fiber node of the dom element.
   * @param {DOMNode} node - The target node.
   * @returns {FiberNode|null} - The react internal FiberNode instance.
   */
  static fiberNode(node) {
    const keys = Object.keys(node);

    if (keys.length === 0) {
      return null;
    }

    return node[keys.find((key) => key.startsWith('__reactInternalInstance$'))] || null;
  }
}

export default Fiber;
