import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const Blog = ({ blog }) => (
  <div>
    <Link className="blog-link" to={`/blogs/${blog._id}`}>
      {blog.title} {blog.author}
    </Link>
  </div>
);

export default connect(({ selection, username }, props) => ({
  isOpen: selection === props.blog._id,
  byThisUser: props.blog.username ? props.blog.username === username : true,
}))(Blog);
