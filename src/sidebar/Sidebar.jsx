import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
  const [width, setWidth] = useState(230);

  /**
   * Modifies the sidebar width as the mouse moves.
   * @param {event} event - The mouse move event.
   */
  const handleMouseMove = (event) => {
    const { clientX } = event;

    setWidth(clientX);
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
   * Initializes listeners for resizing the sidebar.
   * @param {event} event - The mouse down event.
   */
  const handleMouseDown = (event) => {
    // Only accept left mouse clicks.
    if (event.button > 1) {
      return;
    }

    // Persists the horizontal resize cursor for the duration of the action.
    // Without this the cursor will default back to a pointer during a resize action.
    document.documentElement.style.cursor = 'ew-resize';

    // Disable user selection and pointer events to prevent interference during resizing.
    document.body.className += cx('inactive');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
  // eslint-disable-next-line react/forbid-dom-props
    <div className={cx('sidebar')} style={{ width: `${width}px` }}>
      <div className={cx('components')}>
        Components
      </div>
      <div className={cx('layers')}>
        Layers
      </div>
      <div className={cx('resizer')} onMouseDown={handleMouseDown} role="presentation" />
    </div>
  );
};

export default Sidebar;
