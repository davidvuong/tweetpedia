import React, { Component } from 'react';
import SearchInput from '../../containers/SearchInput/SearchInput';
import TweetList from '../../containers/TweetList/TweetList';

if (process.env.BROWSER) { require('./Home.scss'); }

class Home extends Component {
  render() {
    return (
      <div className="container home-page">
        <SearchInput />
        <TweetList />
      </div>
    );
  }
}
export default Home;

import { connect } from 'react-redux';
function mapStateToProps(store) {
  return {
    tweets: store.twitter.tweets
  };
}

export default connect(
  mapStateToProps
)(Home);
