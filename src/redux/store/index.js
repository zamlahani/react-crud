import configureStore from './configure-store';
import { INITIAL_STATE } from '../../common/app-const';

const persistedState = localStorage.getItem('reduxState')
	? JSON.parse(localStorage.getItem('reduxState'))
	: {};

const store = configureStore(INITIAL_STATE, persistedState);

store.subscribe(() => {
	localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
