import React from 'react';
import RouteContent from './RouteContent';

import { decrement } from '../../../redux/actions/action-creators';

const DecrementRoute = () => <RouteContent icon="minus" path="/decrement" label="Decrement" action={decrement} />;

export default DecrementRoute;
