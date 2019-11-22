import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Fiber from '../../react-fiber/react-fiber';
import DispatchContext from '../../context/DispatchContext';
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

  const dispatch = useContext(DispatchContext);

  /**
   * Selects the nearest component from the origin of the click event.
   * @param {Event} event - The click event.
   */
  function selectNearestTarget(event) {
    const id = Fiber.findNearest(event.target);

    if (id) {
      dispatch({ id, type: 'select' });
    }
  }

  useEffect(() => {
    window.addEventListener('click', selectNearestTarget);

    return () => {
      window.removeEventListener('click', selectNearestTarget);
    };
  });

  return (
    <div className={cx('canvas')}>
      <div className={cx('body')} data-terra-sandbox-root>
        {WorkspaceGenerator.generate(imports, workspace)}
      </div>
    </div>
  );
};

Canvas.propTypes = propTypes;

export default Canvas;
