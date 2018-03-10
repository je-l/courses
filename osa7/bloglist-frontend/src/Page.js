import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import {
  selectBlog,
  fetchBlogs,
  createNotification,
  fetchUserToken,
  createLogout,
  deselectBlog,
  createBlogLike,
  createDeleteAction,
} from './app.duck';

const compareBlogs = (a, b) => {
  if (a.likes !== b.likes) {
    return b.likes - a.likes;
  }

  return a._id.localeCompare(b._id);
};

class App extends React.Component {
  state = {
    usernameValue: 'testuser',
    passwordValue: 'pass123',
    loginFormOpen: true,
  };

  componentDidMount() {
    this.props.dispatch(fetchBlogs());
  }

  updateInput = field => ({ target: { value } }) => {
    this.setState({ [field]: value });
  };

  displayNotification = (text, { error = false } = {}) => {
    this.props.dispatch(createNotification(text, error));
  };

  onLogout = e => {
    e.preventDefault();
    this.props.dispatch(createLogout());
  };

  likeBlog = (e, blog) => {
    e.preventDefault();

    this.props.dispatch(createBlogLike(blog));
  };

  onChoose = (e, newSelection) => {
    e.preventDefault();
    const { dispatch, selection: oldSelection } = this.props;

    if (oldSelection === newSelection) {
      dispatch(deselectBlog());
    } else {
      dispatch(selectBlog(newSelection));
    }
  };

  onLogin = e => {
    e.preventDefault();
    const { usernameValue, passwordValue } = this.state;
    this.props.dispatch(fetchUserToken(usernameValue, passwordValue));
  };

  onDeleteBlog = (e, _id) => {
    e.preventDefault();

    this.props.dispatch(createDeleteAction(_id));
  };

  render() {
    const { usernameValue, passwordValue, loginFormOpen } = this.state;

    const {
      notificationText,
      notificationError,
      loading,
      username,
      blogs,
      selection,
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
            <h2>blogs</h2>
            <dl className="bloglist">
              {blogs
                .sort(compareBlogs)
                .map(blog => (
                  <Blog
                    onChoose={e => this.onChoose(e, blog._id)}
                    className="blog-item"
                    onDelete={e => this.onDeleteBlog(e, blog._id)}
                    isOpen={blog._id === selection}
                    key={blog._id}
                    blog={blog}
                    likeBlog={e => this.likeBlog(e, blog)}
                    byThisUser={
                      blog.user === undefined || blog.user.username === username
                    }
                  />
                ))}
            </dl>
            <BlogForm displayNotification={this.displayNotification} />
          </Fragment>
        ) : (
          <LoginForm
            isOpen={loginFormOpen}
            updateInput={this.updateInput}
            username={usernameValue}
            password={passwordValue}
            onLogin={this.onLogin}
            openLoginForm={() => this.setState({ loginFormOpen: true })}
            closeLoginForm={() => this.setState({ loginFormOpen: false })}
          />
        )}
      </Fragment>
    );
  }
}

export default connect(
  ({
    selection,
    blogs,
    username,
    notificationText,
    notificationError,
    loading,
  }) => ({
    notificationText,
    notificationError,
    loading,
    username,
    blogs,
    selection,
  }),
)(App);
