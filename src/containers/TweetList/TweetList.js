import React, { Component } from 'react';
import { connect } from 'react-redux';
import TweetItem from './TweetItem/TweetItem';
import {
  FETCH_INIT,
  FETCH_ERROR,
  FETCH_SUCCESS
} from '../../constants/FetchStatuses';
import configureStore from '../../store/configureStore';
import WikiActionCreators from '../../actions/WikiActionCreators';

if (process.env.BROWSER) { require('./TweetList.scss'); }

class TweetList extends Component {
  constructor(props) {
    super(props);

    this.getDisplayMessage = this.getDisplayMessage.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    twttr.ready((twttr) => { // eslint-disable-line no-undef
      twttr.events.bind('rendered', (event) => {
        const document = event.target.contentDocument;
        document.addEventListener('mouseup', this.onMouseUp);

        // Q: A question for the JavaScript experts...
        //
        // I'm assuming here that the eventListener will automatically get
        // destroyed once the iframe is destroyed. My assumption is based
        // on the fact that the eventListener is tied to the iframe's document
        // and not the outer document.
        //
        // Now, whether or not that's true...
      });
    });
  }

  /* Retrieves the selected text and begins the wiki-search. */
  onMouseUp(event) {
    const text = event.currentTarget.getSelection().toString();

    // Don't trigger dispatch unless we're querying something new.
    const state = configureStore().getState();
    if (state.wiki.query !== text) {
      this.props.setQuery(text);
      this.props.search(text);
    }
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
              No results found <span className="text-warning">:sad_panda:</span>
            </p>
            <img className="sad-panda" src="/images/sad_panda.gif" alt="" />
          </div>
        );
      default:
        return <span />;
    }
  }

  render() {
    if (!this.props.tweets.length) {
      return (
        <div className="tweet-list">
          {this.getDisplayMessage()}
        </div>
      );
    }

    // Show the beautiful, beautiful tweets if supplied.
    const tweets = this.props.tweets.map(tweet => {
      return <TweetItem tweet={tweet} key={tweet.id} />;
    });
    return <div className="tweet-list">{tweets}</div>;
  }
}

function mapStateToProps(store) {
  return {
    tweets: store.twitter.tweets,
    fetchStatus: store.twitter.fetchStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setQuery: (query) => {
      return dispatch(WikiActionCreators.setQuery(query));
    },
    updateHistory: (query) => {
      return dispatch(WikiActionCreators.updateHistory(query));
    },
    search: (query) => {
      return dispatch(WikiActionCreators.search(query));
    }
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(TweetList);
