import React from 'react';
import ReactDOM from 'react-dom';

import Persons from './component/Persons';
import PersonForm from './component/PersonForm';
import Notification from './component/Notification';

import personService from './service/person';


class App extends React.Component {
  state = {
    persons: null,
    filter: '',
    newName: '',
    newNumber: '',
    notification: null,
  };

  componentWillMount() {
    this.fetchPersons();
  }

  onAddNew = async (event) => {
    event.preventDefault();

    const { persons, newName, newNumber } = this.state;

    const previousPerson = persons.find(p => p.name === newName);

    const newPerson = { name: newName, number: newNumber };

    if (previousPerson) {
      if (window.confirm(newPerson.name + ' on jo luettelossa, korvataanko numero?')) {  // eslint-disable-line
        try {
          await personService.update(previousPerson.id, newPerson);
          this.showNotification(`muutettiin nroa henkilölle ${newPerson.name}`);
        } catch (err) {
          console.error(err);
          this.showNotification('muutos epäonnistui');
        }
      }
      // do nothing if canceled confirm
    } else {
      try {
        await personService.create(newPerson);
      } catch (e) {
        console.error(e);
        this.showNotification(e.response.data.error);
        return;
      }

      this.showNotification(`lisättiin ${newPerson.name}`);
    }

    await this.fetchPersons();
  }

  onRemovePerson = async person => {
    if (!window.confirm('poistetaanko ' + person.name)) return;  // eslint-disable-line
    await personService.deleteOne(person.id);

    this.showNotification(`poistettiin ${person.name}`);

    this.setState(prevState => ({
      persons: prevState.persons.filter(p => p.id !== person.id),
    }));
  }

  showNotification = text => {
    this.setState({ notification: text });

    setTimeout(() => {
      this.setState({ notification: null });
    }, 5000);
  }

  fetchPersons = async () => {
    this.setState({ persons: null });
    const { data } = await personService.getAll();
    this.setState({ persons: data });
  }

  render() {
    const {
      persons,
      newName,
      newNumber,
      filter,
      notification,
    } = this.state;

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        {notification && <Notification>{notification}</Notification>}
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
        <Persons
          filter={filter}
          persons={persons}
          onRemovePerson={this.onRemovePerson}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
