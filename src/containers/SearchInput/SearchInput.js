import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FETCH_INIT } from '../../constants/FetchStatuses';
import TwitterActionCreators from '../../actions/TwitterActionCreators';
import SearchInputHeader from './SearchInputHeader/SearchInputHeader';

if (process.env.BROWSER) { require('./SearchInput.scss'); }

export class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.isSearching = this.isSearching.bind(this);
    this.isSearchDisabled = this.isSearchDisabled.bind(this);
  }

  onSearch(event) {
    event.preventDefault();

    // Don't dispatch action if there's nothing worth querying.
    if (!this.props.query) { return null; }
    return this.props.onSearch(this.props.query);
  }

  isSearching() {
    return this.props.fetchStatus === FETCH_INIT;
  }

  isSearchDisabled() {
    return !this.props.query || this.isSearching();
  }

  render() {
    return (
      <div className="search-input">
        <SearchInputHeader />

        <form onSubmit={this.onSearch}>
          <img src="/images/icon.png" alt="" />
          <input
            className="form-control"
            type="text"
            value={this.props.query}
            onChange={this.props.onQueryChange}
            placeholder="Tweet tweet~ Hey man, type something..."
          />
          <Button
            bsStyle="info"
            type="submit"
            disabled={this.isSearchDisabled()}
          >
            {this.isSearching() ? '...' : 'Go'}
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    query: store.twitter.query,
    fetchStatus: store.twitter.fetchStatus
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSearch: (query) => {
      dispatch(TwitterActionCreators.search(query));
    },
    onQueryChange: (event) => {
      dispatch(TwitterActionCreators.setQuery(event.target.value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchInput);
