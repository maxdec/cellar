import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const WineForm = ({ wine, edition = false }) => (
  <form>
    <div className="form-group">
      <label className="control-label">Wine</label>
      <select name="wine" className="form-control"></select>
      <Link to="/wines/new">New Wine</Link>
    </div>

    <div className="form-group">
      <label className="control-label">Acquisition</label>
      <input type="date" name="acquisition" className="form-control" />
    </div>

    <div className="form-group">
      <label className="control-label">Degustation</label>
      <input type="date" name="degustation" className="form-control" />
    </div>

    <div className="form-group">
      <label className="control-label">Row</label>
      <input type="number" name="row" className="form-control" min="1" max="6" />
    </div>

    <div className="form-group">
      <label className="control-label">Column</label>
      <input type="number" name="col" className="form-control" min="1" max="4" />
    </div>

    <div className="form-group">
      <label className="control-label">Notes</label>
      <textarea name="notes" className="form-control"></textarea>
    </div>

    <div className="form-group">
      <input type="submit" className="btn btn-primary" value="Submit" />
    </div>
  </form>
);

WineForm.propTypes = {
  wine: PropTypes.object,
  edition: PropTypes.boolean,
};

export default WineForm;
