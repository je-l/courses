import React from 'react';

import styled from 'styled-components';


const TallAnecdote = styled.div`
  height: 50px;
  overflow-y: auto;
`;

export default ({ contents, votes }) => (
  <div>
    <TallAnecdote>
      {contents}
    </TallAnecdote>
    <p>ääniä: {votes}</p>
  </div>
);
