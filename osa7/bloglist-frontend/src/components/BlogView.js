import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs, createBlogLike, createDeleteAction } from '../app.duck';

class BlogView extends React.Component {
  componentWIllMount() {
    const { dispatch, blogs } = this.props;

    if (!blogs) {
      dispatch(fetchBlogs());
    }
  }

  render() {
    const { byThisUser, blog, dispatch } = this.props;

    return (
      <Fragment>
        <Link to="/">home</Link>
        {blog && (
          <Fragment>
            <h2>{blog.title}</h2>
            <dd>
              <Link to={blog.url}>{blog.url}</Link>
            </dd>
            <dd>
              {blog.likes} likes
              <button onClick={() => dispatch(createBlogLike(blog))}>
                like
              </button>
            </dd>
            <dd>added by {blog.author}</dd>
            {byThisUser && (
              <dd>
                <button onClick={() => dispatch(createDeleteAction(blog._id))}>
                  delete
                </button>
              </dd>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default connect(({ blogs, username }, { match: { params } }) => {
  const blog = blogs && blogs.find(b => b._id === params.id);
  const byThisUser = blog && username === blog.user.username;

  return {
    blog,
    byThisUser,
  };
})(BlogView);
