import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";

class Header extends Component {
  onLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    const { isAuthenticated } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            reduxFireBlog
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/posts" className="nav-link">
                  Posts
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/images" className="nav-link">
                  Images
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  users
                </Link>
              </li>

              {isAuthenticated ? (
                <li className="nav-item">
                  <button onClick={() => this.onLogout()} className="nav-link">
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/signin" className="nav-link">
                    Signin
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}

export default connect(mapStateToProps)(Header);
