import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tree from '../tree/Tree';
import styles from './Layers.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The identifier of the selected component.
   */
  selected: PropTypes.string,
  /**
   * The in-progress workspace design.
   */
  workspace: PropTypes.object.isRequired,
};

const Layers = (props) => {
  const { selected, workspace } = props;

  const container = useRef();

  /**
   * Modifies the layers height as the mouse moves.
   * @param {event} event - The mouse move event.
   */
  const handleMouseMove = (event) => {
    container.current.style.height = `${window.innerHeight - event.clientY}px`;
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
    <div className={cx('layers')} ref={container}>
      <div className={cx('header')} onMouseDown={handleMouseDown} role="presentation">
        <div className={cx('resizer')} />
        Layers Selected:
      </div>
      <Tree workspace={workspace} selected={selected} />
    </div>
  );
};

Layers.propTypes = propTypes;

export default Layers;
