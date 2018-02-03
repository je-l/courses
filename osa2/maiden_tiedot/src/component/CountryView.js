import React from 'react';
import styled from 'styled-components';
import CountryInfo from './CountryInfo';

const Country = styled.div`
  cursor: pointer;
`;

export default ({ countries, onSelectCountry }) => {
  if (countries.length > 10) {
    return <div>too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  } else if (countries.length === 0) {
    return <div>no results</div>;
  }

  return countries.map(c => (
    <Country
      key={c.numericCode}
      onClick={() => onSelectCountry(c.name)}
    >{c.name}
    </Country>
  ));  // eslint-disable-line
};
