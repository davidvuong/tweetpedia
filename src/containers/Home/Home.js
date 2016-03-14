import React, { Component } from 'react';
import SearchInput from '../../containers/SearchInput/SearchInput';
import TweetList from '../../containers/TweetList/TweetList';
import WikiSidePanel from '../../containers/WikiSidePanel/WikiSidePanel';

if (process.env.BROWSER) { require('./Home.scss'); }

class Home extends Component {
  render() {
    return (
      <div className="container home-page">
        <WikiSidePanel />

        <SearchInput />
        <TweetList />
      </div>
    );
  }
}
export default Home;
