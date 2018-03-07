import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

class Filter extends React.Component {
  handleChange = event => {
    this.props.dispatch(setFilter(event.target.value));
  };
  render() {
    const style = {
      marginBottom: 10,
    };

    return (
      <div style={style}>
        filter{' '}
        <input value={this.props.filterValue} onChange={this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filterValue: state.filter,
});

export default connect(mapStateToProps)(Filter);
