import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../app.duck';

class UserList extends React.Component {
  componentWillMount() {
    if (this.props.users === null) {
      this.props.dispatch(fetchUsers());
    }
  }

  render() {
    const { users } = this.props;
    return (
      <Fragment>
        <Link to="/">home</Link>
        <table>
          <thead>
            <tr>
              <th>user</th>
              <th>blogs added</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map(user => (
                <tr key={user._id}>
                  <td>
                    <Link to={`/users/${user._id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <h3>Users</h3>
      </Fragment>
    );
  }
}

export default connect(({ users }) => ({ users }))(UserList);
