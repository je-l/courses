import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  openLoginForm,
  closeLoginForm,
  isOpen,
  username,
  password,
  updateInput,
  onLogin,
}) =>
  isOpen ? (
    <Fragment>
      <h2>log in to application</h2>
      <form>
        <div>
          username
          <input value={username} onChange={updateInput('usernameValue')} />
        </div>
        <div>
          password
          <input value={password} onChange={updateInput('passwordValue')} />
        </div>
        <div>
          <button className="login-btn" onClick={onLogin}>
            login
          </button>
        </div>
        <div>
          <button onClick={closeLoginForm}>cancel</button>
        </div>
      </form>
    </Fragment>
  ) : (
    <button onClick={openLoginForm}>log in</button>
  );

LoginForm.propTypes = {
  openLoginForm: PropTypes.func.isRequired,
  closeLoginForm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  updateInput: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
