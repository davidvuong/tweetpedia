import React, { Component } from 'react';
import { connect } from 'react-redux';
import TweetItem from './TweetItem/TweetItem';
import {
  FETCH_INIT,
  FETCH_ERROR,
  FETCH_SUCCESS
} from '../../constants/FetchStatuses';

if (process.env.BROWSER) { require('./TweetList.scss'); }

class TweetList extends Component {
  constructor(props) {
    super(props);

    this.getDisplayMessage = this.getDisplayMessage.bind(this);
  }

  /* Retrieves the status message if no tweets available. */
  getDisplayMessage() {
    switch (this.props.fetchStatus) {
      case FETCH_INIT:
        return <span>Loading tweets...</span>;
      case FETCH_ERROR:
      case FETCH_SUCCESS:
        return (
          <div>
            <p>
              No results found
              <span className="text-warning">:sad_panda:</span>
            </p>
            <img src="/images/sad_panda.gif" alt="" />
          </div>
        );
      default:
        return <span />;
    }
  }

  render() {
    let tweets;
    if (this.props.tweets.length) {
      tweets = this.props.tweets.map(tweet => {
        return <TweetItem tweet={tweet} key={tweet.id} />;
      });
    } else {
      tweets = this.getDisplayMessage();
    }

    return (
      <div className="tweet-list">{tweets}</div>
    );
  }
}

function mapStateToProps(store) {
  return {
    tweets: store.twitter.tweets,
    fetchStatus: store.twitter.fetchStatus
  };
}

export default connect(
  mapStateToProps
)(TweetList);
