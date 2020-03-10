import DataAccessService from '../data/data-access-service';

const TodoDomainService = {
	/**
	 * Example usage for DataAccessService
	 * @returns {*}
	 */
	getTodos() {
		return DataAccessService.get();
	}
};

export default TodoDomainService;
