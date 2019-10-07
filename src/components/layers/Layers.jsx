import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Layers.module.scss';

const cx = classNames.bind(styles);

const Layers = () => {
  const [height, setHeight] = useState('40%');

  /**
   * Modifies the layers height as the mouse moves.
   * @param {event} event - The mouse move event.
   */
  const handleMouseMove = (event) => {
    const { clientY } = event;

    setHeight(`${window.innerHeight - clientY}px`);
  };

  /**
   * Restores the window state on mouse up.
   */
  const handleMouseUp = () => {
    // Re-enable user selection and pointer events.
    document.body.classList.remove(cx('inactive'));
    document.documentElement.style.cursor = '';

    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  /**
   * Initializes listeners for resizing the layers.
   * @param {event} event - The mouse down event.
   */
  const handleMouseDown = (event) => {
    // Only accept left mouse clicks.
    if (event.button > 1) {
      return;
    }

    document.documentElement.style.cursor = 'ns-resize';

    // Disable user selection and pointer events to prevent interference during resizing.
    document.body.className += cx('inactive');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    // eslint-disable-next-line react/forbid-dom-props
    <div className={cx('layers')} style={{ height }}>
      <div className={cx('resizer')} onMouseDown={handleMouseDown} role="presentation" />
      <div className={cx('header')}>
        Layers
      </div>
    </div>
  );
};

export default Layers;
