import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './CatalogItem.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The identifier of the component.
   */
  identifier: PropTypes.string,
  /**
   * The name of the component.
   */
  name: PropTypes.string,
};

const CatalogItem = (props) => {
  const { identifier, name } = props;

  /**
   * Handles the drag start event. Transfers component information.
   * @param {Event} event - The drag start event.
   */
  const handleDragStart = (event) => {
    event.dataTransfer.setData('terra-sandbox-data', JSON.stringify({ identifier }));
  };

  return (
    <div className={cx('catalog-item')} draggable onDragStart={handleDragStart}>
      {name}
    </div>
  );
};

CatalogItem.propTypes = propTypes;

export default CatalogItem;
