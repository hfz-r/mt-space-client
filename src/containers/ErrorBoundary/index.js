import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Error from './template_';

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error, info) {
    return {
      error,
      errorInfo: info,
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      error,
      errorInfo: info,
    });
  }

  handleClick = () => {
    this.setState({ error: null, errorInfo: null });
    this.props.push('/home');
  };

  render() {
    if (this.state.error) {
      return (
        <Error
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onClick={this.handleClick}
        />
      );
    }
    return this.props.children;
  }
}

export default connect(null, { push })(ErrorBoundary);
