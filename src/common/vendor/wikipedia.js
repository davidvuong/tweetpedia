import fetch from 'isomorphic-fetch';
import wtf_wikipedia from 'wtf_wikipedia'; // eslint-disable-line camelcase
import {
  WIKI_LANG,
  WIKI_ENDPOINT,
  WIKI_FORMAT
} from '../../constants/Constants';

/* eslint-disable */
function getArticle(title) {
  return new Promise((resolve, reject) => {
    if (!title) { return reject(); }
    return wtf_wikipedia.from_api(title, WIKI_LANG, (markup) => {
      // See: https://github.com/spencermountain/wtf_wikipedia
      return markup ? resolve(wtf_wikipedia.parse(markup)) : reject();
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
