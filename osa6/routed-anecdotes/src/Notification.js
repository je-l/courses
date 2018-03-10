import styled from 'styled-components';

const Notification = styled.h3`
  position: absolute;
  z-index: 1;

  top: 0vh;
  left: 20px;
  margin: 0;
  padding: 7px;
  min-width: 100px;
  text-align: center;

  background-color: gray;
  color: white;

  transition: transform 250ms;
  transform: ${props =>
    props.visible ? 'translateY(0%)' : 'translateY(-100%)'};
`;

export default Notification;
