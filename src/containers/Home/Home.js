import React, { Component } from 'react';
import SearchInput from '../../containers/SearchInput/SearchInput';

if (process.env.BROWSER) { require('./Home.scss'); }

class Home extends Component {
  render() {
    return (
      <div className="container home-page">
        <SearchInput />
      </div>
    );
  }
}
export default Home;
