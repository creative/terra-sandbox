import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tooltip from '../tooltip/Tooltip';
import styles from './CatalogItem.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The description of the component.
   */
  description: PropTypes.string,
  /**
   * A url to the component documentation page.
   */
  documentation: PropTypes.string,
  /**
   * The identifier of the component.
   */
  identifier: PropTypes.string,
  /**
   * The name of the component.
   */
  name: PropTypes.string,
  /**
   * The version of the component.
   */
  version: PropTypes.string,
};

const CatalogItem = (props) => {
  const {
    description,
    documentation,
    identifier,
    name,
    version,
  } = props;

  const targetRef = useRef(null);

  /**
   * Data transfers component information during a drag start event.
   * @param {Event} event - The drag start event.
   */
  const handleDragStart = (event) => {
    event.dataTransfer.setData('text', identifier);
  };

  return (
    <div className={cx('catalog-item')} draggable onDragStart={handleDragStart} ref={targetRef}>
      {name}
      <Tooltip target={targetRef}>
        <div className={cx('tooltip')}>
          <div className={cx('header')}>
            <span className={cx('name')}>{name}</span>
            <span className={cx('version')}>{version}</span>
          </div>
          <p className={cx('description')}>{description}</p>
          <div>
            <a className={cx('link')} href={documentation} target="_blank" rel="noopener noreferrer">
              View documentation
            </a>
          </div>
        </div>
      </Tooltip>
    </div>
  );
};

CatalogItem.propTypes = propTypes;

export default CatalogItem;
