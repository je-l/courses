import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import CountryView from './component/CountryView';

const API_URL = 'https://restcountries.eu/rest/v2';

class App extends React.Component {
  state = {
    countries: null,
    filter: '',
  };

  async componentWillMount() {
    const { data } = await axios.get(`${API_URL}/all`);

    this.setState({ countries: data });
  }

  filterCountries = () => {
    const { countries, filter } = this.state;

    const lowerFilter = filter.toLowerCase();

    return countries.filter(country => (
      country.name.toLowerCase().includes(lowerFilter)
    ));
  }

  render() {
    const { countries, filter } = this.state;
    if (!countries) {
      return <div>lataa...</div>;
    }

    return (
      <div>
        find countries:
        <input
          value={filter}
          onChange={e => this.setState({ filter: e.target.value })}
        />
        {filter && (
          <CountryView
            countries={this.filterCountries()}
            onSelectCountry={v => this.setState({ filter: v })}
          />
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
