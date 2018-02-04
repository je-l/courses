import React from 'react';
import styled from 'styled-components';

const ModalWrap = styled.div`
  top: 0px;
  margin: 20px;
  padding: 5px;
  position: absolute;
  min-width: 300px;

  background: white;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 3px;
  box-shadow: 1.5px 2.5px 10px 0 rgba(0, 0, 0, 0.2);
`;

const InfoText = styled.div`
  height: 20px;
  line-height: 20px;
`;

export default ({ children }) => (
  <ModalWrap>
    <InfoText>{children}</InfoText>
  </ModalWrap>
);
