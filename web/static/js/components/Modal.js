import React, { PropTypes } from 'react';

class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    display: PropTypes.bool
  };

  render() {
    const { children, title, display } = this.props;

    return (
      <div className="modal in" style={{ display: display ? 'block' : 'none'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
