import React from 'react';
import classNames from 'classnames';

export default ({className, color}) => {
  const colorClass = classNames({
    [className]: true,
    tag: true,
    'color-label': true,
    // 'pull-xs-right': true,
    'is-red-wine': color === 'red',
    'is-rose-wine': color === 'rose',
    'is-white-wine': color === 'white',
  });

  return <span className={colorClass} title={color}>&nbsp;&nbsp;</span>;
};
