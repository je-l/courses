import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { createBlogAction } from '../app.duck';

const Wrapper = styled.div`
  margin: 10px 0;
`;

class BlogForm extends React.Component {
  state = {
    title: '',
    url: '',
    author: '',
  };

  onCreate = e => {
    e.preventDefault();
    const { title, url, author } = this.state;
    this.props.dispatch(createBlogAction(title, { url, author }));
  };

  updateField = field => e => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const { title, author, url } = this.state;

    return (
      <Wrapper>
        <h1>create new</h1>
        <form>
          <div>
            title
            <input onChange={this.updateField('title')} value={title} />
          </div>
          <div>
            author
            <input onChange={this.updateField('author')} value={author} />
          </div>
          <div>
            url
            <input onChange={this.updateField('url')} value={url} />
          </div>
          <button onClick={this.onCreate}>create</button>
        </form>
      </Wrapper>
    );
  }
}

export default connect()(BlogForm);
