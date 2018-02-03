import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Persons from './component/Persons';
import PersonForm from './component/PersonForm';

const API_URL = 'http://localhost:3001';

class App extends React.Component {
  state = {
    persons: null,
    filter: '',
    newName: '',
    newNumber: '',
  };

  async componentWillMount() {
    const { data } = await axios.get(`${API_URL}/persons`);

    this.setState({ persons: data });
  }

  onAddNew = (event) => {
    event.preventDefault();

    const { persons, newName, newNumber } = this.state;

    if (persons.map(p => p.name).includes(newName)) {
      return;
    }

    const newPersons = [...persons, { name: newName, number: newNumber }];
    this.setState({ persons: newPersons, newName: '', newNumber: '' });
  }

  render() {
    const {
      persons,
      newName,
      newNumber,
      filter,
    } = this.state;

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          rajaa näytettäviä
          <input
            value={filter}
            onChange={e => this.setState({ filter: e.target.value })}
          />
        </div>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          onNameChange={e => this.setState({ newName: e.target.value })}
          onNumberChange={e => this.setState({ newNumber: e.target.value })}
          addNew={this.onAddNew}
        />
        <Persons filter={filter} persons={persons} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
