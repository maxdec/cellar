import React, { PropTypes } from 'react';

const capitalizeFirstLetter = str => (str.charAt(0).toUpperCase() + str.slice(1));
const format = str => str.split('_').map(capitalizeFirstLetter).join(' ');

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
