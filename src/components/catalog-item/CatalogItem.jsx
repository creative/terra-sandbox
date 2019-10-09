import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './CatalogItem.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The name of the component.
   */
  name: PropTypes.string,
};

const CatalogItem = (props) => {
  const { name } = props;

  return (
    <div className={cx('catalog-item')}>
      {name}
    </div>
  );
};

CatalogItem.propTypes = propTypes;

export default CatalogItem;
