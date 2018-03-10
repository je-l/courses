import React, { Fragment } from 'react';
import styled from 'styled-components';

const ButtonText = styled.span`
  cursor: pointer;
`;

const Blog = ({ blog, isOpen, onChoose, onDelete, voteBlog, byThisUser }) => (
  <Fragment>
    <dt>
      <ButtonText onClick={() => onChoose()}>{blog.title}</ButtonText>{' '}
      {blog.author}
    </dt>
    {isOpen && (
      <Fragment>
        <dd>
          <a href={blog.url}>{blog.url}</a>
        </dd>
        <dd>
          {blog.likes} likes
          <button onClick={() => voteBlog()}>like</button>
        </dd>
        <dd>added by {blog.author}</dd>
        {byThisUser && (
          <dd>
            <button onClick={onDelete}>delete</button>
          </dd>
        )}
      </Fragment>
    )}
  </Fragment>
);

export default Blog;
