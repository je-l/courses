import styled from 'styled-components';

const Notification = styled.div`
  position: absolute;
  border: 2px solid ${props => (props.error ? 'red' : '')};
  background-color: white;
  font-size: 18px;
  top: 50px;
`;

export default Notification;
