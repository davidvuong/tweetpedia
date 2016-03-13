import React, { Component } from 'react';
import { connect } from 'react-redux';

import TwitterActionCreators from '../../actions/TwitterActionCreators';

import Logo from '../../components/Logo/Logo';
import SearchInput from '../../components/SearchInput/SearchInput';

if (process.env.BROWSER) {
  require('./Home.scss');
}

// TODO: Make SearchInput a container. Home shouldn't have to worry about it.
class Home extends Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(event) {
    event.preventDefault();
    return this.props.onSearch(this.props.query);
  }

  render() {
    return (
      <div className="container home-page">
        <div className="inner-container">
          <Logo />
          <SearchInput
            query={this.props.query}
            onQueryChange={this.props.onQueryChange}
            onSearch={this.onSearch}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    query: store.twitter.query
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearch: (query) => {
      const action = TwitterActionCreators.search(query);
      if (action) { dispatch(action); }
    },
    onQueryChange: (event) => {
      dispatch(TwitterActionCreators.setQuery(event.target.value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
