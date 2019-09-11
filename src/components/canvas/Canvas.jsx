import React from 'react';
import Base from 'terra-base';
import classNames from 'classnames/bind';
import styles from './Canvas.module.scss';

const cx = classNames.bind(styles);

const Canvas = () => (
  <Base locale="en">
    <div className={cx('canvas')}>
      Canvas
    </div>
  </Base>
);

export default Canvas;
