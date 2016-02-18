import React, { PropTypes } from 'react';

const BottlesList = ({ bottles }) => (
  <table className="table table-striped">
    <thead key="thead">
      <tr>
        <th key="name">Name</th>
      </tr>
    </thead>
    <tbody key="tbody">
      {bottles.toJS().map((bottle) => (<tr key={bottle.id}><td>{bottle.wine.name}</td></tr>))}
    </tbody>
  </table>
);

BottlesList.propTypes = {
  bottles: PropTypes.array.isRequired
};

export default BottlesList;
