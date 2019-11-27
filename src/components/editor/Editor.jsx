import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import TreeParser from '../../tree-parser/tree-parser';
import styles from './Editor.module.scss';

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

const Editor = (props) => {
  const { selected, workspace } = props;
  const { root } = workspace;

  const target = TreeParser.find(root, selected);

  const fields = [];

  if (target) {
    const { props: targetProps } = target;
    const properties = Object.keys(targetProps);

    for (let index = 0; index < properties.length; index += 1) {
      const { type, value } = targetProps[properties[index]];

      if (type === 'string') {
        fields.push(<input type="text" value={value} />);
      } else if (type === 'bool') {
        fields.push(<input type="checkbox" checked={value} />);
      } else if (type === 'component') {
        fields.push(<div>{value.name}</div>);
      } else if (type === 'node') {
        fields.push(<ul>{Object.keys(value).map(node => <li>{value[node].name}</li>)}</ul>);
      }
    }
  }

  return (
    <div className={cx('editor')}>
      <div>
        Editor
      </div>
      <div>
        {target && target.name}
        {!target && <div>No component selected</div>}
      </div>
    </div>
  );
};

Editor.propTypes = propTypes;

export default Editor;
