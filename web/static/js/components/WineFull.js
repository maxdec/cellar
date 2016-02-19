import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { actions } from '../store';
import { wineFields } from '../fields';

const fragmentConfig = {
  fragment: `
    fragment wine on Wine {
      ${wineFields.join(', ')}
    }
  `,
  mutations: {
    edit: {
      query: `
        mutation updateWine($id: ID!, $name: String, $designation: String, $vintage: Int, $ready_to_drink: String, $color: String, $notes: String){
          updateWine(
            id: $id,
            name: $name,
            designation: $designation,
            vintage: $vintage,
            ready_to_drink: $ready_to_drink,
            color: $color,
            notes: $notes,
          ) {
            ${wineFields.join(', ')}
          }
        }
      `,
      action: [actions.cellar.selectWine]
    }
  }
};

class WineFull extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      edition: false,
      edits: {}
    };
  }

  static propTypes = {
    wine: PropTypes.object,
  };

  static defaultProps = {
    wine: {}
  };

  submitOrEdit() {
    const { edition } = this.state;
    if (edition) {
      return (
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Save" onClick={::this.clickSave} />
        </div>
      );
    }
    return (
      <div className="form-group">
        <input type="submit" className="btn btn-primary" value="Edit" onClick={::this.clickEdit} />
      </div>
    );
  }

  clickEdit(event) {
    event.preventDefault();
    this.setState({ edition: true });
  }

  clickSave(event) {
    event.preventDefault();
    this.setState({ edition: false });
    this.props.mutations.edit(Object.assign({}, this.props.wine, this.state.edits));
  }

  onChange(event) {
    const state = this.state;
    state.edits[event.target.name] = event.target.value;
    this.setState(state);
  }

  render() {
    const { wine } = this.props;
    const { edits, edition } = this.state;
    return (
      <form>
        <div className="form-group">
          <label className="control-label">Name</label>
          <input type="text" name="name" value={edits.name || wine.name} className="form-control" readOnly={!edition} onChange={::this.onChange} />
        </div>

        <div className="form-group">
          <label className="control-label">Designation</label>
          <input type="text" name="designation" value={edits.designation || wine.designation} className="form-control" readOnly={!edition} onChange={::this.onChange} />
        </div>

        <div className="form-group">
          <label className="control-label">Vintage</label>
          <input type="number" name="vintage" value={edits.vintage || wine.vintage} className="form-control" readOnly={!edition} onChange={::this.onChange} />
        </div>

        <div className="form-group">
          <label className="control-label">Ready to Drink</label>
          <input type="text" name="ready_to_drink" value={edits.ready_to_drink || wine.ready_to_drink} className="form-control" readOnly={!edition} onChange={::this.onChange} />
        </div>

        <div className="form-group">
          <label className="control-label">Color</label>
          <input type="text" name="color" value={edits.color || wine.color} className="form-control" readOnly={!edition} onChange={::this.onChange} />
        </div>

        <div className="form-group">
          <label className="control-label">Notes</label>
          <textarea name="notes" value={edits.notes || wine.notes} className="form-control" readOnly={!edition} onChange={::this.onChange}></textarea>
        </div>

        {this.submitOrEdit()}
      </form>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(WineFull);
