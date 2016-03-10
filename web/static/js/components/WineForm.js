import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { validateWine } from '../utils';

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

  constructor(props) {
    super(props);
    this.state = {
      edits: {},
      validation: {},
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      edits: props.wine,
      validation: {}
    });
  }

  onChange(event) {
    const state = this.state;
    state.edits[event.target.name] = event.target.value;
    state.validation = validateWine(state.edits) || {};
    this.setState(state);
  }

  clickSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state.edits);
  }

  renderInput(inputType, name, placeholder) {
    const value = this.state.edits[name];
    const errors = this.state.validation[name];
    const error = errors ? (<small className="text-danger">{errors[0]}</small>) : null;
    const formClass = classNames({
      'form-group': true,
      row: true,
      'has-danger': !!error,
    });
    const inputClass = classNames({
      'form-control': true,
      'form-control-danger': !!error,
    });

    return (
      <div className={formClass}>
        <label className="col-xs-2 form-control-label text-xs-right">{name}</label>
        <div className="col-xs-6">
          <input
            type={inputType}
            name={name}
            value={value}
            className={inputClass}
            onChange={::this.onChange}
            placeholder={placeholder} />
          {error}
        </div>
      </div>
    );
  }

  render() {
    const {edits} = this.state;

    return (
      <form>
        {::this.renderInput('text', 'name', 'Bargemone')}
        {::this.renderInput('text', 'designation', 'Coteaux d\'Aix')}
        {::this.renderInput('number', 'vintage', '2015')}
        {::this.renderInput('text', 'readyToDrink', '2015-2017')}
        {::this.renderInput('text', 'color', 'red')}

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Notes</label>
          <div className="col-xs-6">
            <textarea name="notes" value={edits.notes} className="form-control" onChange={::this.onChange}></textarea>
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
