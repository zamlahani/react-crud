import { combineReducers } from 'redux';
import formModal from './formModal';
import todos from './todos';

export default combineReducers({
	todos,
	formModal
});
