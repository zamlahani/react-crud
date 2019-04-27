import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import ConfigService from './services/common/config-service';

import App from './components/App';

export default function Root ({
  store
}) {
  return (
    <Provider store={store}>
      <BrowserRouter basename={ConfigService.getPublicBasename()}>
        <App/>
      </BrowserRouter>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object
};
