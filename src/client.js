import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import routes from './routes';
import configureStore from './store/configureStore';

render(
  <Provider store={ configureStore() }>
    { routes }
  </Provider>,
  document.getElementById('app')
);
