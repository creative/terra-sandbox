/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import WorkspaceGenerator from '../../generators/workspace/workspace-generator';
import styles from './Canvas.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The in-progress workspace design.
   */
  workspace: PropTypes.object.isRequired,
  /**
   * The available dynamic imports that have been loaded onto the page.
   */
  imports: PropTypes.object.isRequired,
};

const Canvas = (props) => {
  const { imports, workspace } = props;

  return (
    <div className={cx('canvas')}>
      <div className={cx('body')}>
        {WorkspaceGenerator.generate(imports, workspace)}
      </div>
    </div>
  );
};

Canvas.propTypes = propTypes;

export default Canvas;
