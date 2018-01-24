import React from 'react';

export default ({ children, ...other }) => (
  <button {...other}>{children}</button>
);
