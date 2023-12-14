import axios from 'axios';
import store from '../global/store';

const envestBackend = axios.create({
	baseURL: 'https://api.envest.money/',
});

envestBackend.interceptors.request.use(
	(config) => {
		const accessToken = store.getState().auth.accessToken;
		const idToken = store.getState().auth.idToken;
		const isValid = store.getState().auth.isValid;
		if (isValid && config.headers !== undefined) {
			config.headers.authorization = `Bearer ${accessToken}`;
			config.headers['x-id-token'] = idToken;
		}
		return config;
	},
	(error) => {
		//TODO: Show an alert message
		console.error(error);
		return Promise.reject(error);
	}
);

envestBackend.interceptors.response.use(
	(config) => {
		//TODO: Add logic for response interception
		return config;
	},
	(error) => {
		//TODO: Show an alert message
		console.error(error);
		return Promise.reject(error);
	}
);

export {envestBackend};
