import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Immutable from 'immutable';

const BottleForm = ({ bottle }) => (
  <form>
    <div class="form-group">
      <label className="control-label">Wine</label>
      <select name="wine" className="form-control"></select>
      <Link to="/wines/new">New Wine</Link>
    </div>

    <div class="form-group">
      <label className="control-label">Acquisition</label>
      <input type="date" name="acquisition" className="form-control" />
    </div>

    <div class="form-group">
      <label className="control-label">Degustation</label>
      <input type="date" name="degustation" className="form-control" />
    </div>

    <div class="form-group">
      <label className="control-label">Row</label>
      <input type="number" name="row" className="form-control" min="1" max="6" />
    </div>

    <div class="form-group">
      <label className="control-label">Column</label>
      <input type="number" name="col" className="form-control" min="1" max="4" />
    </div>

    <div class="form-group">
      <label className="control-label">Notes</label>
      <textarea name="notes" className="form-control"></textarea>
    </div>

    <div class="form-group">
      <input type="submit" className="btn btn-primary" value="Submit" />
    </div>
  </form>
);

BottleForm.propTypes = {
  bottle: PropTypes.instanceOf(Immutable.Map),
  wines: PropTypes.instanceOf(Immutable.List)
};

export default BottleForm;
