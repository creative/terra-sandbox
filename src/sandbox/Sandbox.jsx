import React from 'react';
import classNames from 'classnames/bind';
import Sidebar from '../sidebar/Sidebar';
import styles from './Sandbox.module.scss';

const cx = classNames.bind(styles);

const Sandbox = () => (
  <div className={cx('sandbox')}>
    <div className={cx('header')}>
      Header
    </div>
    <div className={cx('layout')}>
      <Sidebar />
      <div className={cx('workspace')}>
        Workspace
      </div>
      <div className={cx('editor')}>
        Editor
      </div>
    </div>
  </div>
);

export default Sandbox;
