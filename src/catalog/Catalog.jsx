import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Catalog.module.scss';
import plugins from '../plugins.json';

const cx = classNames.bind(styles);

const Catalog = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={cx('catalog')}>
      <div>Components</div>
      <div className={cx('search')}>
        <input
          className={cx('input')}
          onChange={(event) => setSearchValue(event.target.value.toLowerCase())}
          placeholder="Search Components"
          value={searchValue}
        />
      </div>
      <div className={cx('components')}>
        {Object.keys(plugins).map((key) => {
          const { name, exportType } = plugins[key];

          if (exportType === 'Default' && name.toLowerCase().indexOf(searchValue) > -1) {
            return <div key={key} className={cx('component')}>{name}</div>;
          }

          return undefined;
        })}
      </div>
    </div>
  );
};

export default Catalog;
