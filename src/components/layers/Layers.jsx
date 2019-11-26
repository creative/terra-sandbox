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
   * The in-progress workspace design.
   */
  workspace: PropTypes.object.isRequired,
};

const Layers = (props) => {
  const { selected, workspace } = props;

  return (
    <div className={cx('layers')}>
      <Tree workspace={workspace} selected={selected} />
    </div>
  );
};

Layers.propTypes = propTypes;

export default Layers;
