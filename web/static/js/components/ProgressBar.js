import React, { PropTypes } from 'react';
import classNames from 'classnames';

function yearsRange(date) {
  let [min, max] = date.split('-').map(year => parseInt(year, 10));
  if (!max) max = min + 2;
  let mid = min;
  if (max) mid = min + (max - min) / 2;

  return { min, max, mid };
}

/**
  perc ∆
       |
  100  +----------------+----+----+
       |           case1|    |    |
       |                |    |    |
   80  +----------------+    |    |
       |           case2|    |    |
       |                |    |    |
       |                |    |    |
       |                |    |    |
   30  +------+         |    |    |
       |      |         |    |    |
       |      |         |    |    |
       +------+---------+----+----+-------->
           vintage     min  mid  max      year
*/
function percentage(dateToDrink, vintage) {
  const currentYear = (new Date()).getFullYear();
  const { min, max, mid } = yearsRange(dateToDrink);
  vintage = parseInt(vintage, 10);

  // case 1
  if (!max) return Math.min(100, (100 - 30) / (min - vintage) * (currentYear - vintage) + 30);

  // case 2
  if (currentYear < min) return (80 - 30) / (min - vintage) * (currentYear - vintage) + 30;
  if (currentYear < mid) return (100 - 80) / (mid - min) * (currentYear - min) + 80;
  return 100;
}

const ProgressBar = ({ wine }) => {
  const perc = percentage(wine.readyToDrink, wine.vintage);
  const progressClass = classNames({
    'progress': true,
    'progress-danger': perc < 50,
    'progress-warning': perc >= 50 && perc < 80,
    'progress-success': perc >= 80
  });

  return (
    <progress className={progressClass} value={perc} max="100" />
  );
};

ProgressBar.propTypes = {
  wine: PropTypes.object.isRequired,
};

export default ProgressBar;
