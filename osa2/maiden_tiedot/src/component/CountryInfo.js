import React from 'react';
import styled from 'styled-components';

const Flag = styled.img`
  width: 300px;
`;

export default ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <Flag src={country.flag} alt="country flag" />
  </div>
);
