import express from 'express';
import twitter from './common/vendor/twitter';
import wikipedia from './common/vendor/wikipedia';

const router = express.Router();

function search(query, module, res) {
  // Strip leading&trailing whitespaces for more accurate results.
  module.search(query.replace(/ /g, '')).then((data) => {
    res.json(data);
  }, (err) => {
    res.status(404).send({ error: err });
  });
}

/* Handle API requests to fetch tweets. */
router.route('/search-twitter')
  .get((req, res) => {
    search(req.query.q, twitter, res);
  });

/* Handle API requests to fetch Wikipedia articles. */
router.route('/search-wikipedia')
  .get((req, res) => {
    search(req.query.q, wikipedia, res);
  });

export default router;
