import axios from 'axios';

/**
 * Service for making AJAX requests.
 * Uses Axios (https://github.com/mzabriskie/axios)
 */
const instance = axios.create({
	baseURL:
		' https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list',
	timeout: 4000
});

export default {
	request(options) {
		return instance.request(options);
	}
};
