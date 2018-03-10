import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  > div {
    margin: 10px auto;
  }
`;

const InputWrap = styled.input`
  max-width: 400px;
`;

const FormInput = ({ className, ...rest }) => (
  <InputWrap className={`uk-input ${className}`} {...rest} />
);

class AnecdoteForm extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      author: '',
      info: '',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0,
    });
  };

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <div>
            <textarea
              placeholder="content"
              className="uk-textarea"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <FormInput
              className="abc"
              placeholder="author"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <FormInput
              placeholder="url for more info"
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
          </div>
          <button className="uk-button uk-button-default">create</button>
        </Form>
      </div>
    );
  }
}

export default AnecdoteForm;
