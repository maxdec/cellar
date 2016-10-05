import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { WineSelect } from '../containers';
import { validateBottle, today } from '../utils';

class BottleForm extends React.Component {
  static propTypes = {
    bottle: PropTypes.object,
    errors: PropTypes.array,
    submit: PropTypes.func.isRequired,
    row: PropTypes.string,
    col: PropTypes.string,
  };

  static defaultProps = {
    // bottle: {},
    errors: []
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      edits: {},
      validation: {},
    };
    this.state.edits.acquisition = today();
    if (props.col) this.state.edits.col = props.col;
    if (props.row) this.state.edits.row = props.row;
  }

  componentWillReceiveProps(props) {
    const state = {
      edits: props.bottle || {},
      validation: {}
    };
    if (!state.edits.acquisition) {
      state.edits.acquisition = today();
    }
    if (props.col) state.edits.col = props.col;
    if (props.row) state.edits.row = props.row;
    this.setState(state);
  }

  selectWine(wine) {
    const state = this.state;
    state.edits.wine = wine;
    this.setState(state);
  }

  resetWine() {
    const state = this.state;
    state.edits.wine = null;
    this.setState(state);
  }

  onChange(event) {
    event.preventDefault();
    const state = this.state;
    state.edits[event.target.name] = event.target.value;
    state.validation = validateBottle(state.edits) || {};
    this.setState(state);
  }

  submit(event) {
    event.preventDefault();
    this.props.submit({
      ...this.state.edits,
      wineId: (this.state.edits.wine || {}).id
    });
  }

  renderInput(inputType, name, placeholder) {
    const value = this.state.edits[name];
    const errors = this.state.validation[name];
    const error = errors ? (<small className="text-danger">{errors[0]}</small>) : null;
    const formClass = classNames({
      'form-group': true,
      row: true,
      'has-danger': !!error,
      'has-success': (value || value === 0) && !error
    });
    const inputClass = classNames({
      'form-control': true,
      'form-control-danger': !!error,
      'form-control-success': (value || value === 0) && !error
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

  renderWineInput() {
    const error = !this.state.edits.wine;
    const formClass = classNames({
      'form-group': true,
      row: true,
      'has-danger': error,
      'has-success': !error,
    });
    const inputClass = classNames({
      'form-control': true,
      'form-control-danger': error,
      'form-control-success': !error,
    });

    return (
      <div className={formClass}>
        <label className="col-xs-2 form-control-label text-xs-right">Wine</label>
        <div className="col-xs-6">
          <WineSelect wine={this.state.edits.wine} onSelect={::this.selectWine} onReset={::this.resetWine} className={inputClass} />
          <Link to="/wines/new">New Wine</Link>
        </div>
      </div>
    );
  }

  render() {
    const { edits } = this.state;
    const errors = Object.keys(this.state.validation);

    return (
      <form onSubmit={::this.submit}>

        {::this.renderWineInput()}
        {::this.renderInput('date', 'acquisition', today())}
        {::this.renderInput('date', 'degustation', today())}
        {::this.renderInput('number', 'row', '1')}
        {::this.renderInput('number', 'col', '1')}

        <div className="form-group row">
          <label className="col-xs-2 form-control-label text-xs-right">Notes</label>
          <div className="col-xs-6">
            <textarea name="notes" value={edits.notes} className="form-control" onChange={::this.onChange}></textarea>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-xs-6 col-xs-offset-2">
            <div className="row">
              <input type="submit" className="btn btn-primary-outline col-xs-2 m-x-1" value="Save" onClick={::this.submit} disabled={errors.length > 0} />
              <a onClick={goBack(this.context.router)} className="btn btn-secondary-outline col-xs-2">Back</a>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default BottleForm;

/**
 * Private helpers
 */
function goBack(router) {
  return (event) => {
    event.preventDefault();
    router.goBack();
  };
}
