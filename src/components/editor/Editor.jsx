import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Editor.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The identifier of the selected component.
   */
  selected: PropTypes.string,
};

const Editor = (props) => {
  const { selected } = props;

  return (
    <div className={cx('editor')}>
      Editor Selected:
      {' '}
      {selected}
    </div>
  );
};

Editor.propTypes = propTypes;

export default Editor;
