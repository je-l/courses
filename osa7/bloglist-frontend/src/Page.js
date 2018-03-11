import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import UserList from './components/UserList';
import UserView from './components/UserView';
import BlogView from './components/BlogView';
import { fetchBlogs, createLogout } from './app.duck';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchBlogs());
  }

  onLogout = e => {
    e.preventDefault();
    this.props.dispatch(createLogout());
  };

  render() {
    const {
      notificationText,
      notificationError,
      loading,
      username,
    } = this.props;

    if (loading) {
      return <div>loading</div>;
    }

    return (
      <Fragment>
        {notificationText && (
          <Notification error={notificationError}>
            {notificationText}
          </Notification>
        )}
        {username ? (
          <Fragment>
            <p>
              logged in as {username}
              <button onClick={this.onLogout}>logout</button>
            </p>
            <Route exact path="/" component={BlogList} />
            <Route exact path="/blogs/:id" component={BlogView} />
            <Route exact path="/users" component={UserList} />
            <Route path="/users/:id" component={UserView} />
            <BlogForm />
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </Fragment>
    );
  }
}

export default withRouter(
  connect(({ username, notificationText, notificationError, loading }) => ({
    notificationText,
    notificationError,
    loading,
    username,
  }))(App),
);
