import React, { PropTypes } from 'react';

function lastPart(str) {
  const strs = str.split('.');
  return strs[strs.length - 1];
}

const capitalizeFirstLetter = str => (str.charAt(0).toUpperCase() + str.slice(1));
const format = str => lastPart(str).split('_').map(capitalizeFirstLetter).join(' ');

const TableHead = ({ fields }) => (
  <thead>
    <tr>
      {fields.map(field => (<th key={field}>{format(field)}</th>))}
    </tr>
  </thead>
);

TableHead.propTypes = {
  fields: PropTypes.array.isRequired
};

export default TableHead;
