import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ text }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return text ? <div style={style}>{text}</div> : null;
};

const mapStateToProps = state => ({
  text: state.notification,
});

export default connect(mapStateToProps)(Notification);
