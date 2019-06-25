import React from 'react';
import classNames from 'classnames/bind';
import Sidebar from '../sidebar/Sidebar';
import Workspace from '../workspace/Workspace';
import styles from './Sandbox.module.scss';

const cx = classNames.bind(styles);

const Sandbox = () => (
  <div className={cx('sandbox')}>
    <div className={cx('header')}>
      Header
    </div>
    <div className={cx('layout')}>
      <Sidebar />
      <Workspace />
      <div className={cx('editor')}>
        Editor
      </div>
    </div>
  </div>
);

export default Sandbox;
