import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { browserHistory, Link } from 'react-router';
import { wineFragment } from '../fields';

const fragmentConfig = {
  fragment: wineFragment,
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
            ...wine
          }
        }
        ${wineFragment}
      `,
      action: actions => actions.cellar.selectWine
    }
  }
};

class WineFull extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      edition: props.wine.id === 'new',
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
    return edition
      ? (<input type="submit" className="btn btn-primary-outline col-xs-2 m-x-1" value="Save" onClick={::this.clickSave} />)
      : (<input type="submit" className="btn btn-primary-outline col-xs-2 m-x-1" value="Edit" onClick={::this.clickEdit} />);
  }

  clickEdit(event) {
    event.preventDefault();
    this.setState({ edition: true });
  }

  clickSave(event) {
    event.preventDefault();
    this.setState({ edition: false });
    this.props.mutations.edit(Object.assign({}, this.props.wine, this.state.edits));
    browserHistory.push('/wines');
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
        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Name</label>
          <div className="col-xs-6">
            <input type="text" name="name" value={edits.name || wine.name} className="form-control" readOnly={!edition} onChange={::this.onChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Designation</label>
          <div className="col-xs-6">
            <input type="text" name="designation" value={edits.designation || wine.designation} className="form-control" readOnly={!edition} onChange={::this.onChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Vintage</label>
          <div className="col-xs-6">
            <input type="number" name="vintage" value={edits.vintage || wine.vintage} className="form-control" readOnly={!edition} onChange={::this.onChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Ready to Drink</label>
          <div className="col-xs-6">
            <input type="text" name="ready_to_drink" value={edits.ready_to_drink || wine.ready_to_drink} className="form-control" readOnly={!edition} onChange={::this.onChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Color</label>
          <div className="col-xs-6">
            <input type="text" name="color" value={edits.color || wine.color} className="form-control" readOnly={!edition} onChange={::this.onChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Notes</label>
          <div className="col-xs-6">
            <textarea name="notes" value={edits.notes || wine.notes} className="form-control" readOnly={!edition} onChange={::this.onChange}></textarea>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-xs-6 col-xs-offset-2">
            <div className="row">
              {this.submitOrEdit()}
              <Link to="/wines" className="btn btn-secondary-outline col-xs-2">Back</Link>
            </div>
          </div>
        </div>
      </form>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(WineFull);
