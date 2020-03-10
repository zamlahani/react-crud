import {
	FETCH_POSTS_REQUEST,
	FETCH_POSTS_FAILURE,
	FETCH_POSTS_SUCCESS
} from './types';

import store from '../store/';
import TodoDomainService from '../../services/domain/todo-domain-service';

function requestTodos() {
	return {
		type: FETCH_POSTS_REQUEST
	};
}

function receivedTodos(todos) {
	return {
		type: FETCH_POSTS_SUCCESS,
		todos
	};
}
function failedTodos(todos) {
	return {
		type: FETCH_POSTS_FAILURE
	};
}

export function fetchTodos() {
	return dispatch => {
		dispatch(requestTodos());
		return TodoDomainService.getTodos()
			.then(data => dispatch(receivedTodos(data)))
			.catch(error => {
				dispatch(failedTodos());
			});
	};
}

export function doFetch() {
	store.dispatch(fetchTodos());
}
