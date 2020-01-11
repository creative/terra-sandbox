import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import DispatchContext from '../../context/DispatchContext';
import ExampleGenerator from '../../generators/example/example-generator';
import plugins from '../../plugins/plugins';
import imports from '../../plugins/imports';
import styles from './Placeholder.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The placeholder identifier.
   */
  id: PropTypes.string.isRequired,
};

const Placeholder = (props) => {
  const { id } = props;
  const [dropped, setDropped] = useState('Drop Zone');

  const dispatch = useContext(DispatchContext);

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

      imports[importFrom]().then((dynamicImport) => {
        const replacement = ExampleGenerator.generate({ name: identifier, type: 'element' });

        dispatch({ id, dynamicImport, replacement, type: 'replace' });
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setDropped('Whoops, something went wrong');
      });
    }
  };

  return (
    <div
      id={id}
      className={cx('placeholder')}
      onDragOver={handleDragover}
      onDragEnter={handleDragenter}
      onDrop={handleDrop}
    >
      {dropped}
    </div>
  );
};

Placeholder.propTypes = propTypes;

export default Placeholder;
