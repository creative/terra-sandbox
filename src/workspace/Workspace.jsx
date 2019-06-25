import React from 'react';
import classNames from 'classnames/bind';
import Canvas from '../canvas/Canvas';
import styles from './Workspace.module.scss';

const cx = classNames.bind(styles);

const Workspace = () => (
  <div className={cx('workspace')}>
    <Canvas />
  </div>
);

export default Workspace;
