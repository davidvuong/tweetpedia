import React, { Component, PropTypes } from 'react';

if (process.env.BROWSER) { require('./TweetItem.scss'); }

const propTypes = {
  tweet: PropTypes.object.isRequired
};

class TweetItem extends Component {
  constructor(props) {
    super(props);

    this.getTweetUrl = this.getTweetUrl.bind(this);
  }

  componentDidMount() {
    // Only load the current tweet element once.
    twttr.widgets.load( // eslint-disable-line no-undef
      document.getElementsByClassName(`id-${this.props.tweet.id}`)
    );
  }

  getTweetUrl() {
    const tweet = this.props.tweet;
    return `https://twitter.com/${tweet.screenName}/status/${tweet.id}`;
  }

  render() {
    return (
      <blockquote className={`tweet-item twitter-tweet id-${this.props.tweet.id}`}>
        <a href={this.getTweetUrl()}></a>
      </blockquote>
    );
  }
}
TweetItem.propTypes = propTypes;

export default TweetItem;
