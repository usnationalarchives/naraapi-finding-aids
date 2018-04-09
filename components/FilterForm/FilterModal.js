import React from 'react';
import ReactDOM from 'react-dom';

class FilterModal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.getElementById('root').appendChild(this.el);
  }

  componentWillUnmount() {
    document.getElementById('root').removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default FilterModal;
