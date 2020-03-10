import {
	OPEN_FORM_MODAL,
	CLOSE_FORM_MODAL,
	TOGGLE_FORM_MODAL,
	CREATE_TODO,
	EDIT_TODO,
	STORE_TODO,
	UPDATE_TODO
} from './types';

export const openFormModal = makeActionCreator(OPEN_FORM_MODAL);
export const closeFormModal = makeActionCreator(CLOSE_FORM_MODAL);
export const toggleFormModal = makeActionCreator(TOGGLE_FORM_MODAL);
export const editTodo = makeActionCreator(EDIT_TODO, 'todo');
export const createTodo = makeActionCreator(CREATE_TODO);
export const storeTodo = makeActionCreator(STORE_TODO, 'todo');
export const updateTodo = makeActionCreator(
	UPDATE_TODO,
	'todo',
	'currentIndex'
);

/**
 * Generic function to generate action creators based on input arguments.
 * The first argument is always treated as the Redux action type; all other
 * arguments are treated as a property on the action object itself.
 *
 *   Example: const actionType = 'DO_IT';
 *            const actionCreator = makeActionCreator(actionType, 'data');
 *            actionCreator(123); --> { type: "DO_IT", data: 123 }
 */
export function makeActionCreator(type, ...keys) {
	if (!type) throw new Error('Type cannot be null/undefined');
	return function(...args) {
		let action = { type };
		keys.forEach((arg, index) => {
			action[keys[index]] = args[index];
		});
		return action;
	};
}
