import React from 'react';

import Otsikko from './Otsikko';
import Sisalto from './Sisalto';
import Yhteensa from './Yhteensa';

export default ({ kurssi }) => (
  <div>
    <Otsikko kurssi={kurssi.nimi} />
    <Sisalto osat={kurssi.osat} />
    <Yhteensa osat={kurssi.osat} />
  </div>
);
