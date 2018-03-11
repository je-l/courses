import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchUserToken } from '../app.duck';

class LoginForm extends React.Component {
  state = {
    username: 'testuser',
    password: 'pass123',
    isOpen: true,
  };

  updateInput = field => ({ target: { value } }) => {
    this.setState({ [field]: value });
  };

  onLogin = e => {
    e.preventDefault();
    const { username, password } = this.state;

    this.props.dispatch(fetchUserToken(username, password));
  };

  onCancel = e => {
    e.preventDefault();
    this.setState({ isOpen: false });
  };

  render() {
    const { username, password, isOpen } = this.state;

    return isOpen ? (
      <Fragment>
        <h2>log in to application</h2>
        <form>
          <div>
            username
            <input value={username} onChange={this.updateInput('username')} />
          </div>
          <div>
            password
            <input value={password} onChange={this.updateInput('password')} />
          </div>
          <div>
            <button className="login-btn" onClick={this.onLogin}>
              login
            </button>
          </div>
          <div>
            <button onClick={this.onCancel}>cancel</button>
          </div>
        </form>
      </Fragment>
    ) : (
      <button onClick={() => this.setState({ isOpen: true })}>log in</button>
    );
  }
}

export default connect()(LoginForm);
