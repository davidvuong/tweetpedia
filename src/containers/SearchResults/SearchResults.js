import React from 'react';
import { connect } from 'react-redux';

if (process.env.BROWSER) {
  require('./SearchResults.scss');
}

class SearchResults extends React.Component {
  render() {
    return (
      <div className="search-results-page">
        <p>TweetPedia search results page!</p>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
