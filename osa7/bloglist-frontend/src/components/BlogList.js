import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Blog from './Blog';

const compareBlogs = (a, b) => {
  if (a.likes !== b.likes) {
    return b.likes - a.likes;
  }

  return a._id.localeCompare(b._id);
};

const BlogList = ({ blogs }) => (
  <Fragment>
    <Link to="/users">users</Link>
    <h2>blogs</h2>
    <dl className="bloglist">
      {blogs &&
        blogs
          .sort(compareBlogs)
          .map(blog => (
            <Blog className="blog-item" key={blog._id} blog={blog} />
          ))}
    </dl>
  </Fragment>
);

export default connect(({ blogs, selection, username }) => ({
  blogs,
  selection,
  username,
}))(BlogList);
