import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class BottleForm extends React.Component {
  static propTypes = {
    bottle: PropTypes.object,
    errors: PropTypes.arra,
    wines: PropTypes.array.isRequired,
    submit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    bottle: {},
    errors: []
  };

  constructor (props) {
    super(props);
    this.state = {
      edits: {}
    };
  }

  onChange(event) {
    const state = this.state;
    state.edits[event.target.name] = event.target.value;
    this.setState(state);
  }

  clickSubmit(event) {
    event.preventDefault();
    const changeset = { ...this.props.bottle, ...this.state.edits };
    this.props.submit(changeset);
  }

  renderInput(type, name, value) {
    return (
      <div className="form-group row">
        <label className="col-xs-2 form-control-label text-xs-right">{name}</label>
        <div className="col-xs-6">
          <input type={type} name={name} value={value} className="form-control form-control-danger" onChange={::this.onChange} />
        </div>
      </div>
    );
  }

  render() {
    const changeset = { ...this.props.bottle, ...this.state.edits };

    return (
      <form>
        {/*::this.renderInput('text', 'wine', changeset.wine)*/}

        {/*
        <div className="form-group">
          <label className="control-label">Wine</label>
          <select name="wine" className="form-control"></select>
          <Link to="/wines/new">New Wine</Link>
        </div>
        */}

        {::this.renderInput('date', 'acquisition', changeset.acquisition)}
        {::this.renderInput('date', 'degustation', changeset.degustation)}
        {::this.renderInput('number', 'row', changeset.row)}
        {::this.renderInput('number', 'col', changeset.col)}

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Notes</label>
          <div className="col-xs-6">
            <textarea name="notes" value={changeset.notes} className="form-control" onChange={::this.onChange}></textarea>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-xs-6 col-xs-offset-2">
            <div className="row">
              <input type="submit" className="btn btn-primary-outline col-xs-2 m-x-1" value="Save" onClick={::this.clickSubmit} />
              <Link to="/wines" className="btn btn-secondary-outline col-xs-2">Back</Link>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default BottleForm;
