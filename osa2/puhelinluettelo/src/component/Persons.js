import React from 'react';

const filterPersons = (filter, persons) => (
  persons.filter(person => (
    person.name.toLowerCase().includes(filter)
  ))
);

export default ({ filter, persons }) => (
  <div>
    <h2>Numerot</h2>
    {persons == null ? <div>lataa...</div> :
    <table>
      <tbody>
        {filterPersons(filter, persons).map(p => (
          <tr key={p.name}>
            <td>{p.name}</td>
            <td>{p.number}</td>
          </tr>
        ))}
      </tbody>
    </table>}
  </div>
);
