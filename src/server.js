import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import express from 'express';

import routes from './routes';
import configureStore from './store/configureStore';
import config from './config';

const app = express();
app.use(express.static('public'));

/* API router handles all requests made to `/api`. */
const apiRouter = express.Router();
apiRouter.route('/search')
  .get((req, res) => {
    res.send('stub');
  });

app.use('/api', apiRouter);
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);

      // See: https://github.com/reactjs/react-router/blob/master/docs/API.md#redirect
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);

      // Matched a route in `routes`!
    } else if (props) {
      // TODO: Improve on this! ...later
      //
      // There has got to be a better way to do this that doesn't involve
      // reading from disk and replacing a special string in the index file.
      const html = fs.readFileSync('src/index.html', 'utf8');
      res.send(html.replace(
        '{app-data}', renderToString(
          <Provider store={ configureStore() }>
            <RouterContext {...props} />
          </Provider>
        )
      ));
    } else {
      res.status(404).send('Not Found');
    }
  });
});

const PORT = process.env.PORT || config.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}... Press Ctrl+C to stop.`);
});
