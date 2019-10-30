import React, { useState } from 'react';
import classNames from 'classnames/bind';
import plugins from '../../plugins/plugins';
import imports from '../../plugins/imports';
import styles from './Canvas.module.scss';

const cx = classNames.bind(styles);

const Canvas = () => {
  const [dropped, setDropped] = useState('Empty');
  /**
   * Handles the drag over event.
   * @param {Event} event - The drag over event.
   */
  const handleDragover = (event) => {
    event.preventDefault();
  };

  /**
   * Handles the drag enter event.
   * @param {Event} event - The drag enter event.
   */
  const handleDragenter = (event) => {
    event.preventDefault();
  };

  /**
   * Handles the drop event.
   * @param {Event} event - The drop event.
   */
  const handleDrop = (event) => {
    const sandboxData = event.dataTransfer.getData('terra-sandbox-data');

    if (sandboxData) {
      const { identifier } = JSON.parse(sandboxData);
      const { importFrom } = plugins[identifier];

      imports[importFrom]().then(() => {
        setDropped(identifier);
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    }
  };

  return (
    <div className={cx('canvas')} onDragOver={handleDragover} onDragEnter={handleDragenter} onDrop={handleDrop}>
      {dropped}
    </div>
  );
};

export default Canvas;
