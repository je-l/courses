import React from 'react';
import ReactDOM from 'react-dom';

import Otsikko from './component/Otsikko';
import Sisalto from './component/Sisalto';
import Yhteensa from './component/Yhteensa';


const kurssi = {
  nimi: 'Half Stack -sovelluskehitys',
  osat: [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10,
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7,
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14,
    },
  ],
};

const App = () => (
  <div>
    <Otsikko kurssi={kurssi.nimi} />
    <Sisalto osat={kurssi.osat} />
    <Yhteensa osat={kurssi.osat} />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
