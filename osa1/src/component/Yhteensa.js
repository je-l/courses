import React from 'react';

const assignmentSum = osat => (
  osat.map(osa => osa.tehtavia)
    .reduce((acc, cur) => acc + cur)
);

export default ({ osat }) => (
  <p>yhteensä {assignmentSum(osat)} tehtävää</p>
);
