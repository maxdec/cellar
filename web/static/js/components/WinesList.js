import React, { PropTypes } from 'react';
import Immutable from 'immutable';

const WinesList = ({ wines }) => (
  <table className="table table-striped">
    <thead key="thead">
      <tr>
        <th key="name">Name</th>
      </tr>
    </thead>
    <tbody key="tbody">
      {wines.map((wine) => (<tr>{wine.name}</tr>))}
    </tbody>
  </table>
);

WinesList.propTypes = {
  wines: PropTypes.instanceOf(Immutable.List).isRequired
};

export default WinesList;
