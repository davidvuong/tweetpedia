import React, { Component, PropTypes } from 'react';

if (process.env.BROWSER) { require('./TweetItem.scss'); }

const propTypes = {
  tweet: PropTypes.object.isRequired
};

class TweetItem extends Component {
  constructor(props) {
    super(props);

    this.getTweetHref = this.getTweetHref.bind(this);
  }

  componentDidMount() {
    twttr.widgets.load(); // eslint-disable-line no-undef
  }

  getTweetHref() {
    const tweet = this.props.tweet;
    return `https://twitter.com/${tweet.screenName}/status/${tweet.id}`;
  }

  render() {
    return (
      <blockquote className="tweet-item twitter-tweet">
        <a href={this.getTweetHref()}></a>
      </blockquote>
    );
  }
}
TweetItem.propTypes = propTypes;

export default TweetItem;
