import React, { useState } from 'react';
import classNames from 'classnames/bind';
import CatalogItem from '../catalog-item/CatalogItem';
import styles from './Catalog.module.scss';
import plugins from '../../plugins/plugins.json';

const cx = classNames.bind(styles);

const Catalog = () => {
  const [searchValue, setSearchValue] = useState('');

  /**
   * Handles updates to the input change events.
   * @param {Event} event - The input on change event;
   */
  const handleChange = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  /**
   * The filtered component list to populate the catalog.
   */
  const components = Object.keys(plugins).map((key) => {
    const { name, exportType } = plugins[key];

    // Subcomponents are excluded.
    if (exportType === 'Default' && name.toLowerCase().indexOf(searchValue) > -1) {
      return <CatalogItem key={key} identifier={key} name={name} />;
    }

    return undefined;
  });

  return (
    <div className={cx('catalog')}>
      <input
        className={cx('input')}
        onChange={handleChange}
        placeholder="Search Components"
        type="Search"
        value={searchValue}
      />
      <div className={cx('components')}>
        {components}
      </div>
    </div>
  );
};

export default Catalog;
