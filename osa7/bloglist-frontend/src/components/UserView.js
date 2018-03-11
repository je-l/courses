import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../app.duck';

class UserView extends React.Component {
  componentWillMount() {
    if (!this.props.users) {
      this.props.dispatch(fetchUsers());
    }
  }

  render() {
    const { user } = this.props;
    if (!user) return null;

    return (
      <Fragment>
        <Link to="/">home</Link>
        <h2>{user.username}</h2>
        <h3>Added blogs</h3>
        <ul>{user.blogs.map(blog => <li key={blog._id}>{blog.title}</li>)}</ul>
      </Fragment>
    );
  }
}

export default connect(({ users }, { match: { params } }) => ({
  user: users && users.find(u => u._id === params.id),
  users,
}))(UserView);
