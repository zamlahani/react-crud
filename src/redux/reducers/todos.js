import { INITIAL_STATE } from '../../common/app-const';
import {
	FETCH_POSTS_REQUEST,
	FETCH_POSTS_FAILURE,
	FETCH_POSTS_SUCCESS,
	STORE_TODO,
	UPDATE_TODO
} from '../actions/types';

const todos = (state = INITIAL_STATE.todos, action) => {
	switch (action.type) {
		case FETCH_POSTS_REQUEST:
			return state;
		case FETCH_POSTS_SUCCESS:
			return [...action.todos];
		case FETCH_POSTS_FAILURE:
			return state;
		case STORE_TODO:
			return [...state, { ...action.todo }];
		case UPDATE_TODO:
			return state.map((item, index) => {
				if (index !== action.currentIndex) {
					// This isn't the item we care about - keep it as-is
					return item;
				}

				// Otherwise, this is the one we want - return an updated value
				return {
					...item,
					...action.todo
				};
			});
		default:
			return state;
	}
};

export default todos;
