import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class WineForm extends React.Component {
  static propTypes = {
    wine: PropTypes.object,
    errors: PropTypes.array,
    submit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    wine: {},
    errors: [],
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
    const changeset = { ...this.props.wine, ...this.state.edits };
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
    const changeset = { ...this.props.wine, ...this.state.edits };

    return (
      <form>
        {::this.renderInput('text', 'name', changeset.name)}
        {::this.renderInput('text', 'designation', changeset.designation)}
        {::this.renderInput('number', 'vintage', changeset.vintage)}
        {::this.renderInput('text', 'readyToDrink', changeset.readyToDrink)}
        {::this.renderInput('text', 'color', changeset.color)}

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

export default WineForm;
