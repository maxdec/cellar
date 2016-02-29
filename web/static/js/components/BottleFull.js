import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { browserHistory, Link } from 'react-router';
import { bottleFragment } from '../fields';

const fragmentConfig = {
  fragment: bottleFragment,
  mutations: {
    edit: {
      query: `
        mutation updateBottle($id: ID!, $name: String, $designation: String, $vintage: Int, $ready_to_drink: String, $color: String, $notes: String){
          updateBottle(
            id: $id,
            name: $name,
            designation: $designation,
            vintage: $vintage,
            ready_to_drink: $ready_to_drink,
            color: $color,
            notes: $notes,
          ) {
            ...bottle
          }
        }
        ${bottleFragment}
      `,
      action: actions => actions.cellar.selectBottle
    }
  }
};

class BottleFull extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      edition: props.bottle.id === 'new',
      edits: {}
    };
  }

  static propTypes = {
    bottle: PropTypes.object,
  };

  static defaultProps = {
    bottle: {}
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
    this.props.mutations.edit(Object.assign({}, this.props.bottle, this.state.edits));
    browserHistory.push('/bottles');
  }

  onChange(event) {
    const state = this.state;
    state.edits[event.target.name] = event.target.value;
    this.setState(state);
  }

  render() {
    const { bottle } = this.props;
    const { edits, edition } = this.state;
    return (
      <form>
        {/*
        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Wine</label>
          <div className="col-xs-6">
            <input type="text" name="name" value={edits.name || bottle.name} className="form-control" readOnly={!edition} onChange={::this.onChange} />
            <select name="wine" className="form-control"></select>
            <Link to="/wines/new">New Wine</Link>
          </div>
        </div>
        */}

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Acquisition</label>
          <div className="col-xs-6">
            <input type="date" name="acquisition" value={edits.acquisition || bottle.acquisition} className="form-control" readOnly={!edition} onChange={::this.onChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Degustation</label>
          <div className="col-xs-6">
            <input type="date" name="degustation" value={edits.degustation || bottle.degustation} className="form-control" readOnly={!edition} onChange={::this.onChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Row</label>
          <div className="col-xs-6">
            <input type="number" name="row" value={edits.row || bottle.row} className="form-control" readOnly={!edition} onChange={::this.onChange} min="1" max="6" />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Column</label>
          <div className="col-xs-6">
            <input type="number" name="col" value={edits.col || bottle.col} className="form-control" readOnly={!edition} onChange={::this.onChange} min="1" max="6" />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Notes</label>
          <div className="col-xs-6">
            <textarea name="notes" value={edits.notes || bottle.notes} className="form-control" readOnly={!edition} onChange={::this.onChange}></textarea>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-xs-6 col-xs-offset-2">
            <div className="row">
              {this.submitOrEdit()}
              <Link to="/bottles" className="btn btn-secondary-outline col-xs-2">Back</Link>
            </div>
          </div>
        </div>
      </form>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(BottleFull);
