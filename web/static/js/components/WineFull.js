import React, { PropTypes } from 'react';
import Gql from 'react-gql';

const fragmentConfig = {
  fragment: `
    fragment wine on Wine {
      id, name, designation, vintage, readyToDrink, color, notes
    }
  `
};

class WineFull extends React.Component {

  static propTypes = {
    wine: PropTypes.object,
    edition: PropTypes.boolean,
  };

  static defaultProps = {
    wine: {}
  };

  submitButtonOrNot(edition) {
    if (!edition) return;
    return (
      <div class="form-group">
        <input type="submit" className="btn btn-primary" value="Submit" />
      </div>
    );
  }

  render() {
    const { wine, edition = false } = this.props;
    return (
      <form>
        <div class="form-group">
          <label className="control-label">Name</label>
          <input type="text" name="name" value={wine.name} className="form-control" disabled={edition} />
        </div>

        <div class="form-group">
          <label className="control-label">Designation</label>
          <input type="text" name="designation" value={wine.designation} className="form-control" disabled={edition} />
        </div>

        <div class="form-group">
          <label className="control-label">Vintage</label>
          <input type="number" name="vintage" value={wine.vintage} className="form-control" disabled={edition} />
        </div>

        <div class="form-group">
          <label className="control-label">Ready to Drink</label>
          <input type="text" name="readyToDrink" value={wine.readyToDrink} className="form-control" disabled={edition} />
        </div>

        <div class="form-group">
          <label className="control-label">Color</label>
          <input type="text" name="color" value={wine.color} className="form-control" disabled={edition} />
        </div>

        <div class="form-group">
          <label className="control-label">Notes</label>
          <textarea name="notes" className="form-control">{wine.notes}</textarea>
        </div>

        {this.submitButtonOrNot(edition)}
      </form>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(WineFull);
