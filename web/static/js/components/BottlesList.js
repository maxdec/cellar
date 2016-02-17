import React, { PropTypes } from 'react';
import Immutable from 'immutable';

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
  bottles: PropTypes.instanceOf(Immutable.List).isRequired
};

export default BottlesList;
