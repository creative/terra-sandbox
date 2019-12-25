import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Fiber from '../../react-fiber/react-fiber';
import DispatchContext from '../../context/DispatchContext';
import styles from './Canvas.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The children of the canvas.
   */
  children: PropTypes.node.isRequired,
};

const Canvas = (props) => {
  const { children } = props;

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
        {children}
      </div>
    </div>
  );
};

Canvas.propTypes = propTypes;

export default Canvas;
