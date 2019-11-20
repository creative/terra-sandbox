import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /**
   * The identifier of the selected component.
   */
  selected: PropTypes.string,
  /**
   * The in-progress workspace design.
   */
  workspace: PropTypes.object.isRequired,
};

const Tree = (props) => {
  const { selected, workspace } = props;
  const { root } = workspace;

  const createTree = (component, depth = 0) => {
    const { id, props: properties, name } = component;

    // eslint-disable-next-line react/forbid-dom-props
    const nodes = [<div key={id} style={{ paddingLeft: `${depth * 15}px` }}>{name.split(':').pop()}</div>];

    Object.keys(properties).forEach((property) => {
      const { type, value } = properties[property];

      if (type === 'node') {
        nodes.push(Object.keys(value).map((node) => createTree(value[node], depth + 1)));
      }

      if (type === 'element') {
        nodes.push(createTree(value, depth + 1));
      }
    });

    return nodes;
  };

  return (
    <>
      <div>Workspace</div>
      {Object.keys(root).map(key => createTree(root[key], 1))}
    </>
  );
};

Tree.propTypes = propTypes;

export default Tree;
