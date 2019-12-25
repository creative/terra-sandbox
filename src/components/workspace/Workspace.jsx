import React, { useReducer } from 'react';
import Base from 'terra-base';
import classNames from 'classnames/bind';
import Editor from '../editor/Editor';
import Sidebar from '../sidebar/Sidebar';
import DispatchContext from '../../context/DispatchContext';
import CanvasGenerator from '../../generators/canvas/canvas-generator';
import reducer, { initialState } from '../../reducer/reducer';

import styles from './Workspace.module.scss';

const cx = classNames.bind(styles);

const Workspace = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { imports, selected, canvas } = state;

  return (
    <Base locale="en">
      <div className={cx('workspace')}>
        <div className={cx('header')}>
          Header
        </div>
        <div className={cx('layout')}>
          <DispatchContext.Provider value={dispatch}>
            <Sidebar selected={selected} canvas={canvas} />
            {CanvasGenerator.generate(imports, canvas)}
            <Editor selected={selected} canvas={canvas} />
          </DispatchContext.Provider>
        </div>
      </div>
    </Base>
  );
};

export default Workspace;
