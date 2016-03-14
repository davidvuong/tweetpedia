import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import express from 'express';

import routes from './routes';
import configureStore from './store/configureStore';
import config from './config';
import apiRouter from './express/api';

const app = express();

// Serve static assets from both `public/` and `assets/`.
app.use(express.static('public'));
app.use(express.static('assets'));

/* API router handles all requests made to `/api`. */
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
      // Read the index file into memory, replacing {app-data} with context.
      const html = fs.readFileSync('src/express/index.html', 'utf8');
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

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}... Press Ctrl+C to stop.`);
});
