import React from 'react';
import Base from 'terra-base';
import classNames from 'classnames/bind';
import Editor from '../editor/Editor';
import Sidebar from '../sidebar/Sidebar';
import Workspace from '../workspace/Workspace';
import styles from './Sandbox.module.scss';

const cx = classNames.bind(styles);

const Sandbox = () => (
  <Base locale="en">
    <div className={cx('sandbox')}>
      <div className={cx('header')}>
        Header
      </div>
      <div className={cx('layout')}>
        <Sidebar />
        <Workspace />
        <Editor />
      </div>
    </div>
  </Base>
);

export default Sandbox;
