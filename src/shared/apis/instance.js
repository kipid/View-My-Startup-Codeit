import axios from 'axios';

const instance = axios.create({
	baseURL: `https://view-my-startup-codeit-be.onrender.com`,
});

export default instance;
