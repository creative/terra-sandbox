import React, { useReducer } from 'react';
import Base from 'terra-base';
import classNames from 'classnames/bind';
import Editor from '../editor/Editor';
import Sidebar from '../sidebar/Sidebar';
import Canvas from '../canvas/Canvas';
import DispatchContext from '../../context/DispatchContext';
import reducer, { initialState } from '../../reducer/reducer';

import styles from './Sandbox.module.scss';

const cx = classNames.bind(styles);

const Sandbox = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { imports, workspace } = state;

  return (
    <Base locale="en">
      <div className={cx('sandbox')}>
        <div className={cx('header')}>
          Header
        </div>
        <div className={cx('layout')}>
          <DispatchContext.Provider value={dispatch}>
            <Sidebar />
            <Canvas imports={imports} workspace={workspace} />
            <Editor />
          </DispatchContext.Provider>
        </div>
      </div>
    </Base>
  );
};

export default Sandbox;
