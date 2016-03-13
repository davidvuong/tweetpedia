import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

const propTypes = {
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

class SearchInput extends Component {
  render() {
    return (
      <form className="search-input form-inline">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            value={this.props.query}
            onChange={this.props.onQueryChange}
            placeholder="Search for tweets..."
          />
          <Button
            bsStyle="primary"
            onClick={this.props.onSearch}
            type="submit"
            disabled={!this.props.query}
          >
            Search
          </Button>
        </div>
      </form>
    );
  }
}
SearchInput.propTypes = propTypes;

export default SearchInput;
