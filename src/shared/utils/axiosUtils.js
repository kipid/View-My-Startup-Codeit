import axios from 'axios';
import isEmpty from './isEmpty.js';
import HttpStatus from './HttpStatus.js';

const HTTP_METHODS = Object.freeze({
	GET: 'GET',
	POST: 'POST',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
	PUT: 'PUT',
});

const BASE_URL = `https://view-my-startup-codeit-be.onrender.com`;
// const BASE_URL = `http://localhost:3100`;

const instance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

async function axiosData({ url, method, data = {}, params = {} }) {
	if (!url || !method) throw new Error('URL and Method is required');
	if (!HTTP_METHODS[method]) throw new Error('Invalid HTTP method');

	const response = await instance({ method, url, data, params })
		.then(res => {
			if (res.status === HttpStatus.NO_CONENT && isEmpty(res.data)) return res.status;

			return res.data;
		})
		.catch(e => {
			throw e;
		});

	return response;
}

export async function axiosGet(url, params) {
	return axiosData({ url, method: HTTP_METHODS.GET, params });
}

export async function axiosPost(url, data) {
	return axiosData({ url, method: HTTP_METHODS.POST, data });
}

export async function axiosPatch(url, data) {
	return axiosData({ url, method: HTTP_METHODS.PATCH, data });
}

export async function axiosPut(url, data) {
	return axiosData({ url, method: HTTP_METHODS.PUT, data });
}

export async function axiosDelete(url, data) {
	return axiosData({ url, method: HTTP_METHODS.DELETE, data });
}
