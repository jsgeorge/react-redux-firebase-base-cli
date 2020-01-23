import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions/auth";

class Login extends Component {
  state = { email: "", password: "" };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("form submitted");
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  render() {
    const { loginError, isAuthenticated } = this.props;
    console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <h2>Sign in</h2>
            <input
              type="text"
              id="email"
              label="Email Address"
              name="email"
              onChange={this.handleEmailChange}
            />
            <br />
            <input
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handlePasswordChange}
            />
            {loginError && (
              <div style={{ color: "red" }}>Incorrect email or password.</div>
            )}
            <button type="submit">Sign In</button>
          </form>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log("state:", state);

  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Login);
