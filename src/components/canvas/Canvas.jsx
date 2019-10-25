import React from 'react';
import classNames from 'classnames/bind';
import styles from './Canvas.module.scss';

const cx = classNames.bind(styles);

const Canvas = () => (
  <div className={cx('canvas')}>
    Canvas
  </div>
);

export default Canvas;
