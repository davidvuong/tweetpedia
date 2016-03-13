import express from 'express';
import twitter from '../vendor/twitter';

const router = express.Router();

/* Handle API requests to fetch tweets. */
router.route('/search-twitter')
  .get((req, res) => {
    twitter.search(req.query.q).then((tweets) => {
      res.json(tweets);
    }, (err) => {
      res.status(400).send({ error: err });
    });
  });

/* Handle API requests to fetch Wikipedia articles. */
router.route('/search-wikipedia')
  .get((req, res) => {
    res.send('NotYetImplemented');
  });

export default router;
