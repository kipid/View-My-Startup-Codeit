import axios from 'axios';

const instance = axios.create({
	baseURL: `https://view-my-startup-codeit-be.onrender.com`,
	// baseURL: `http://localhost:3100`,
});

export default instance;
