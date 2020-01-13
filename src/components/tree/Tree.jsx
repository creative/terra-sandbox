/* eslint-disable react/forbid-dom-props */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import plugins from '../../plugins/plugins';
import styles from './Tree.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The node to generate.
   */
  node: PropTypes.object.isRequired,
  /**
   * The depth of the node.
   */
  depth: PropTypes.number,
};

const defaultProps = {
  depth: 0,
};

const Tree = (props) => {
  const { node, depth } = props;
  const { value } = node;
  const { name, props: properties } = value;

  const children = [];
  const displayName = plugins[name].name;
  const style = { paddingLeft: `${depth * 15}px` };

  Object.keys(properties).forEach((property) => {
    const { id, type, value: propertyValue } = properties[property];

    if (type === 'node') {
      children.push(Object.keys(propertyValue).map((key) => (
        <Tree key={key} node={propertyValue[key]} depth={depth + 1} />
      )));
    }

    if (type === 'element') {
      children.push(<Tree key={id} node={properties[property]} depth={depth + 1} />);
    }
  });

  return (
    <ul className={cx('tree')}>
      <li>
        <div style={style}>
          {displayName}
        </div>
        {children.length > 0 && (
          <ul className={cx('children')}>
            {children}
          </ul>
        )}
      </li>
    </ul>
  );
};

Tree.propTypes = propTypes;
Tree.defaultProps = defaultProps;

export default Tree;
