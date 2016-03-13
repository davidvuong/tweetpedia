import { Promise } from 'es6-promise';
import Twitter from 'twitter';
import config from '../../config';
import { MAX_TWEETS } from '../../constants/Constants';

const client = new Twitter({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token_key: config.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
});

/* Searches for Twitter tweets, fetching `MAX_TWEETS` at a time. */
function search(query) {
  const [endpoint, payload] = ['search/tweets', { q: query, count: MAX_TWEETS }];

  return new Promise((resolve, reject) => {
    client.get(endpoint, payload, (err, data) => {
      if (err) { return reject(err); }

      // Only extract the fields we want to use!
      const tweets = [];
      for (let i = 0; i < data.statuses.length; i++) {
        const tweet = data.statuses[i];
        tweets.push({
          createdAt: tweet.created_at,
          id: tweet.id_str,
          text: tweet.text,
          user: {
            createdAt: tweet.user.created_at,
            id: tweet.user.id_str,
            screenName: tweet.user.screen_name
          }
        });
      }
      return resolve(tweets);
    });
  });
}

export default { search };
