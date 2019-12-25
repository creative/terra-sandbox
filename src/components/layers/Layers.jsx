import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tree from '../tree/Tree';
import styles from './Layers.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The identifier of the selected component.
   */
  selected: PropTypes.string,
  /**
   * The in-progress canvas design.
   */
  canvas: PropTypes.object.isRequired,
};

const Layers = (props) => {
  const { selected, canvas } = props;

  return (
    <div className={cx('layers')}>
      <Tree canvas={canvas} selected={selected} />
    </div>
  );
};

Layers.propTypes = propTypes;

export default Layers;
