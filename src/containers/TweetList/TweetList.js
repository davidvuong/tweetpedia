import React, { Component, PropTypes } from 'react';
import TweetItem from './TweetItem/TweetItem';

if (process.env.BROWSER) { require('./TweetList.scss'); }

const propTypes = {
  tweets: PropTypes.array.isRequired
};

class TweetList extends Component {
  render() {
    let tweets;
    if (this.props.tweets.length) {
      tweets = this.props.tweets.map(tweet => {
        return <TweetItem tweet={tweet} key={tweet.id} />;
      });
    } else {
      tweets = <span>No results found :sad_panda:</span>;
    }

    return (
      <div className="tweet-list">{tweets}</div>
    );
  }
}
TweetList.propTypes = propTypes;

export default TweetList;
