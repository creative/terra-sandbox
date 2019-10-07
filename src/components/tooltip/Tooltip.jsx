import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Tooltip.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The content to be displayed within the tooltip.
   */
  children: PropTypes.node,
};

const Tooltip = (props) => {
  const { children, target } = props;
  const container = document.createElement('div');

  useEffect(() => {
    const { current } = target;

    const displayTooltip = () => {
      container.className = cx('container');
      document.body.appendChild(container);
    };

    const hideTooltip = () => {
      if (container) {
        document.body.removeChild(container);
      }
    };

    if (current) {
      current.addEventListener('mouseenter', displayTooltip);
      current.addEventListener('mouseleave', hideTooltip);
    }
    return () => {
      if (current) {
        current.removeEventListener('mouseenter', displayTooltip);
        current.removeEventListener('mouseleave', hideTooltip);
      }
    };
  }, [container, target]);

  return ReactDOM.createPortal(children, container);
};

Tooltip.propTypes = propTypes;

export default Tooltip;
