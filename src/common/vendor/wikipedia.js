import fetch from 'isomorphic-fetch';
import wtf_wikipedia from 'wtf_wikipedia'; // eslint-disable-line camelcase
import {
  WIKI_LANG,
  WIKI_ENDPOINT,
  WIKI_FORMAT
} from '../../constants/Constants';

// Wikipedia article cache:
//
// It's suggested by Wikipedia to cache requests as it's quite rare that an
// article will be updated. Normally, I would invalidate the cache after a
// certain time frame but for this project, articles are cached indefinitely.
const ARTICLE_CACHE = {};

/* eslint-disable */
function getArticle(title) {
  return new Promise((resolve, reject) => {
    if (!title) { return reject(); }
    if (ARTICLE_CACHE[title]) {
      return resolve(ARTICLE_CACHE[title]);
    }
    return wtf_wikipedia.from_api(title, WIKI_LANG, (markup) => {
      if (!markup) { return reject(); }

      // See: https://github.com/spencermountain/wtf_wikipedia
      ARTICLE_CACHE[title] = {
        text: wtf_wikipedia.plaintext(markup),
        data: wtf_wikipedia.parse(markup)
      };
      return resolve(ARTICLE_CACHE[title]);
    });
  });
}
/* eslint-enable */

function search(query) {
  const endpoint = `
    ${WIKI_ENDPOINT}?action=query&format=${WIKI_FORMAT}&list=search&srsearch=${query}
  `;

  // Querying Wikipedia is not fun. Here is how it currently works:
  //
  // 1. Query the API to search for article titles with `query` in title.
  // 2. Make a request to Media again with the 1st article title.
  // 3. Using `wtf_wikipedia`, parse the response into something a bit more sane.
  // 4. Finally, we merge the list of titles and parsed article into one object.
  return new Promise((resolve, reject) => {
    let matches = [];
    return fetch(endpoint).then(res => {
      return res.json();
    }).then((data) => {
      matches = data.query.search.map(i => i.title);
      return getArticle(matches[0]);
    }).then((data) => {
      return resolve({ matches, article: data });
    }, () => {
      return reject();
    });
  });
}

export default { search };
