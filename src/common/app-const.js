export const INITIAL_STATE = {
	todos: [],
	isFormModalOpen: false,
	formModal: {
		isOpen: false,
		isCreateForm: true,
		id: null,
		title: '',
		description: '',
		status: 0,
		createdAt: ''
	}
};
