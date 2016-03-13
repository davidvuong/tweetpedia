import React, { Component } from 'react';

if (process.env.BROWSER) { require('./SearchInputHeader.scss'); }

class SearchInputHeader extends Component {
  render() {
    return (
      <div className="search-input-header">
        <h1>
          TweetPedia
          <small>
            <em>"tweet tweet..."</em>
          </small>
        </h1>
      </div>
    );
  }
}
export default SearchInputHeader;
