import React, { Fragment } from 'react';
import styled from 'styled-components';
import { withRouter, Route, Link } from 'react-router-dom';
import Notification from './Notification';
import AnecdoteForm from './AnecdoteForm';

const UlLink = ({ children, location: { pathname }, altMatch, to }) => {
  let isActive = pathname === to;

  if (!isActive && altMatch) {
    isActive = altMatch.test(pathname);
  }

  return (
    <li className={`${isActive ? 'uk-active' : ''}`}>
      <Link to={to}>{children}</Link>
    </li>
  );
};

const NavLink = withRouter(UlLink);

const Menu = () => (
  <ul className="uk-tab">
    <NavLink to="/" altMatch={/\/anecdotes\/\d+/}>
      anecdotes
    </NavLink>
    <NavLink to="/create">create new</NavLink>
    <NavLink to="/about">about</NavLink>
  </ul>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul className="uk-list">
      {anecdotes.map(({ id, content }) => (
        <li key={id}>
          <Link to={`/anecdotes/${id}`}>{content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <Fragment>
    <h2>About anecdote app</h2>
    <div className="uk-grid">
      <div className="uk-width-2-3@s">
        <p>According to Wikipedia:</p>
        <i>
          An anecdote is a brief, revealing account of an individual person or
          an incident. Occasionally humorous, anecdotes differ from jokes
          because their primary purpose is not simply to provoke laughter but to
          reveal a truth more general than the brief tale itself, such as to
          characterize a person by delineating a specific quirk or trait, to
          communicate an abstract idea about a person, place, or thing through
          the concrete details of a short narrative. An anecdote is &#34;a story
          with a point.&#34;
        </i>

        <p>
          Software engineering is full of excellent anecdotes, at this app you
          can find the best and add more.
        </p>
      </div>
      <div className="uk-width-1-3@s">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Andrew_S._Tanenbaum_2012.jpg/779px-Andrew_S._Tanenbaum_2012.jpg"  // eslint-disable-line
          alt="Andy Tanenbaum"
          title="Andy Tanenbaum"
        />
      </div>
    </div>
  </Fragment>
);

const FooterContainer = styled.div`
  margin: auto 20px;
`;

const Footer = () => (
  <FooterContainer>
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
      Full Stack -sovelluskehitys
    </a>. See{' '}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{' '}
    for the source code.
  </FooterContainer>
);

const Wrapper = styled.div`
  max-width: 750px;
  margin: 30px;
`;

const AnecdoteSelection = ({ anecdote: { content, votes, info } }) => (
  <Fragment>
    <h2>{content}</h2>
    <p>{`has ${votes} votes`}</p>
    <p>
      for more info see <a href={info}>{info}</a>
    </p>
  </Fragment>
);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info:
            'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1',
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2',
        },
      ],
      notification: '',
      notificationVisible: false,
    };
  }

  notify = text => {
    this.setState({ notification: text, notificationVisible: true });
    setTimeout(() => this.setState({ notificationVisible: false }), 3 * 1000);
  };

  addNew = anecdote => {
    this.setState(({ anecdotes }) => ({
      anecdotes: anecdotes.concat({
        ...anecdote,
        id: (Math.random() * 10000).toFixed(0),
      }),
    }));

    this.notify(`new anecdote '${anecdote.content}' added!`);
    this.props.history.push('/');
  };

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id);

  vote = id => {
    const anecdote = this.anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a));

    this.setState({ anecdotes });
  };

  render() {
    const { notification, notificationVisible } = this.state;
    return (
      <Fragment>
        <Notification visible={notificationVisible}>
          {notification}
        </Notification>
        <Menu />
        <Wrapper>
          <h1>Software anecdotes</h1>
          <Route
            exact
            path="/"
            render={() => <AnecdoteList anecdotes={this.state.anecdotes} />}
          />

          <Route
            exact
            path="/anecdotes/:id"
            render={({ match: { params: { id } } }) => {
              return <AnecdoteSelection anecdote={this.anecdoteById(id)} />;
            }}
          />

          <Route exact path="/about" component={About} />

          <Route
            exact
            path="/create"
            render={() => <AnecdoteForm addNew={this.addNew} />}
          />
        </Wrapper>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(App);
