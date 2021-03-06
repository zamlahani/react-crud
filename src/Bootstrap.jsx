import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './Root';
import store from './redux/store/';

// Require globals
import './scss/style.scss';
import './assets/images/favicon.ico';

const ROOT_ELEMENT = 'example-app';

ReactDOM.render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById(ROOT_ELEMENT)
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      document.getElementById(ROOT_ELEMENT)
    );
  });
}
