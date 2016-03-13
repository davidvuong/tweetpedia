import React from 'react';
import { connect } from 'react-redux';

if (process.env.BROWSER) {
  require('./Home.scss');
}

class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
        TweetPedia home page!
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
)(Home);
