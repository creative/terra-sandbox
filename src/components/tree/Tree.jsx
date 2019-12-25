import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /**
   * The in-progress canvas design.
   */
  canvas: PropTypes.object.isRequired,
};

const Tree = (props) => {
  const { canvas } = props;
  const { root } = canvas;

  const createTree = (node, depth = 0) => {
    const { id, value } = node;
    const { props: properties, name } = value;

    // eslint-disable-next-line react/forbid-dom-props
    const nodes = [<div key={id} style={{ paddingLeft: `${depth * 15}px` }}>{name.split(':').pop()}</div>];

    Object.keys(properties).forEach((property) => {
      const { type, value: propertyValue } = properties[property];

      if (type === 'node') {
        nodes.push(Object.keys(propertyValue).map((key) => createTree(propertyValue[key], depth + 1)));
      }

      if (type === 'element') {
        nodes.push(createTree(properties[property], depth + 1));
      }
    });

    return nodes;
  };

  return (
    <>
      <div data-terra-sandbox-root>canvas</div>
      {/* {Object.keys(root).map((key) => createTree(root[key], 1))} */}
    </>
  );
};

Tree.propTypes = propTypes;

export default Tree;
