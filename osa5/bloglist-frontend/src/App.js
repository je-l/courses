import React, { Fragment } from 'react';
import Blog from './components/Blog';
import blogService, { voteBlog, deleteBlog } from './services/blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import authService from './services/authService';

class App extends React.Component {
  state = {
    usernameValue: 'testuser',
    passwordValue: 'pass123',
    blogs: [],
    selection: null,
    loginFormOpen: true,
    user: JSON.parse(window.localStorage.getItem('token')),
    loading: false,
    notification: null,
  };

  componentDidMount() {
    this.fetchBlogs();
  }

  updateInput = field => ({ target: { value } }) => {
    this.setState({ [field]: value });
  };

  displayNotification = (text, { error = false } = {}) => {
    this.setState({ notification: { text, error } });

    setTimeout(() => this.setState({ notification: null }), 3000);
  };

  onLogin = e => {
    e.preventDefault();
    const { usernameValue, passwordValue } = this.state;

    this.setState({ loading: true });

    authService(usernameValue, passwordValue)
      .then(res => {
        this.setState({ user: res });
        window.localStorage.setItem('token', JSON.stringify(res));
      })
      .catch(err => {
        console.error('err:', err);
        if (err.response.status === 401) {
          this.displayNotification('invalid user/pass', { error: true });
        }
      })
      .then(() => this.setState({ loading: false }));
  };

  onLogout = () => {
    window.localStorage.removeItem('token');
    this.setState({ user: null });
  };

  fetchBlogs = () => {
    this.setState({ loading: true });

    blogService
      .getAll()
      .then(blogs => this.setState({ blogs }))
      .then(() => this.setState({ loading: false }));
  };

  voteBlog = blog => {
    voteBlog(blog)
      .then(() => {
        this.displayNotification('voted successfully');
        this.fetchBlogs();
      })
      .catch(e => {
        this.displayNotification(`err ${e}`, { error: true });
      });
  };

  onDeleteBlog = id => {
    deleteBlog(id)
      .then(() => {
        this.displayNotification('deleted successfully');
        this.fetchBlogs();
      })
      .catch(e => {
        this.displayNotification(`err ${e}`, { error: true });
      });
  };

  render() {
    const {
      user,
      usernameValue,
      blogs,
      passwordValue,
      loading,
      notification,
      loginFormOpen,
      selection,
    } = this.state;

    if (loading) {
      return <div>loading</div>;
    }

    const { username } = user || {};

    return (
      <Fragment>
        {notification && (
          <Notification error={notification.error}>
            {notification.text}
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
              {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
                <Blog
                  onChoose={() =>
                    this.setState(p => ({
                      selection: p.selection === blog._id ? null : blog._id,
                    }))
                  }
                  className="blog-item"
                  onDelete={() => this.onDeleteBlog(blog._id)}
                  isOpen={blog._id === selection}
                  key={blog._id}
                  blog={blog}
                  voteBlog={() => this.voteBlog(blog)}
                  byThisUser={
                    blog.user === undefined || blog.user.username === username
                  }
                />
              ))}
            </dl>
            <BlogForm
              syncBlogs={this.fetchBlogs}
              displayNotification={this.displayNotification}
            />
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

export default App;
