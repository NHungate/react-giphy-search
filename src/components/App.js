import React, { Component } from 'react';
import Header from '../containers/Header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}
