import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import * as Actions from '../actions';

class Header extends Component {
  handleSignout() {
    this.props.signOutUser();
  }

  renderAuthLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/favorites">My Favorites</Link>
        </li>,
        <li className="nav-item" key={2}>
          <a className="nav-link" href="#" onClick={() => this.handleSignout()}>Sign Out</a>
        </li>
      ]
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-item" to="/login">Login</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-item" to="/signup">Sign Up</Link>
        </li>
      ]
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <IndexLink className="navbar-brand" to="/">React2Gifs</IndexLink>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {this.renderAuthLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, Actions)(Header);
