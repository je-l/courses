import React from 'react';

export default ({
  newName, newNumber, onNameChange, onNumberChange, addNew,
}) => (
  <div>
    <h3>lisää uusi</h3>
    <form>
      <div>
        nimi: <input
          value={newName}
          onChange={onNameChange}
        />
      </div>
      <div>
        numero: <input
          value={newNumber}
          onChange={onNumberChange}
        />
      </div>
      <div>
        <button
          onClick={addNew}
        >lisää
        </button>
      </div>
    </form>
  </div>
);
