import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from 'react-tabify';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Icon from '../../common/Icon';

const AsyncIncrement = Loadable({
  loader: () => import('./IncrementRoute'),
  loading () {
    return <Icon icon="cog fa-spin"/>;
  }
});

const AsyncDecrement = Loadable({
  loader: () => import('./DecrementRoute'),
  loading () {
    return <Icon icon="cog fa-spin"/>;
  }
});

const AsyncReset = Loadable({
  loader: () => import('./ResetRoute'),
  loading () {
    return <Icon icon="cog fa-spin"/>;
  }
});

const AsyncTabbedRouter = ({
  location,
  history
}) => {
  return (
    <div className="notification m-top--small">
      <Tabs
        id="router-example-tabs"
        activeKey={location.pathname}
        onSelect={(eventKey) => history.push(eventKey)}>
        <Tab eventKey="/" label="Increment">
          <Route exact path="/" component={AsyncIncrement}/>
        </Tab>
        <Tab eventKey="/decrement" label="Decrement">
          <Route path="/decrement" component={AsyncDecrement}/>
        </Tab>
        <Tab eventKey="/reset" label="Reset">
          <Route path="/reset" component={AsyncReset}/>
        </Tab>
      </Tabs>
    </div>

  );
};

AsyncTabbedRouter.propTypes = {
  location: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object)
};

export default AsyncTabbedRouter;
