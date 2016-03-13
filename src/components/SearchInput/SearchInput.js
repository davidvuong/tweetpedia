import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { FETCH_INIT } from '../../constants/FetchStatuses';

const propTypes = {
  query: PropTypes.string.isRequired,
  fetchStatus: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.isSearching = this.isSearching.bind(this);
    this.isSearchDisabled = this.isSearchDisabled.bind(this);
  }

  isSearching() {
    return this.props.fetchStatus === FETCH_INIT;
  }

  isSearchDisabled() {
    return !this.props.query || this.isSearching();
  }

  render() {
    return (
      <form className="search-input form-inline" onSubmit={this.props.onSearch}>
        <input
          className="form-control"
          type="text"
          value={this.props.query}
          onChange={this.props.onQueryChange}
          placeholder="Search for tweets..."
        />
        <Button
          bsStyle="primary"
          type="submit"
          disabled={this.isSearchDisabled()}
        >
          {this.isSearching() ? 'Searching...' : 'Search'}
        </Button>
      </form>
    );
  }
}
SearchInput.propTypes = propTypes;

export default SearchInput;
