import { INITIAL_STATE } from '../../common/app-const';
import {
	FETCH_POSTS_REQUEST,
	FETCH_POSTS_FAILURE,
	FETCH_POSTS_SUCCESS
} from '../actions/types';

const todos = (state = INITIAL_STATE.todos, action) => {
	switch (action.type) {
		case FETCH_POSTS_REQUEST:
			return state;
		case FETCH_POSTS_SUCCESS:
			return [...action.todos];
		case FETCH_POSTS_FAILURE:
			return state;
		default:
			return state;
	}
};

export default todos;
