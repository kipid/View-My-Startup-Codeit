import docCookies from './docCookies.js';
import encrypt from './encrypt.js';
import instance from './instance.js';

export async function postPwdIter(data = { email: '' }) {
	const iter = await instance.post(`/account/iter`, data);
	return iter.data;
	// return { iter: Number, salt: String }
}

export async function getSsnIter(data = { userId: '', createdAt: 0 }) {
	docCookies.setItem('userId', data.userId, 1, '/', null);
	docCookies.setItem('createdAt', data.createdAt, 1, '/', null);
	const iter = await instance.get(`/account/session-iter`, data);
	return iter.data;
	// return { iter: Number, sessionSalt: String }
}

export async function postSsnAndCallback(data, callback, ...args) {
	// data = { userId: '', createdAt: 0, sessionPwd: 'abc' }
	const iter = await getSsnIter(data);
	docCookies.setItem('userId', data.userId, 1, '/', null);
	docCookies.setItem('createdAt', data.createdAt, 1, '/', null);
	docCookies.setItem('sessionEncrypted', encrypt(iter.sessionSalt, data.sessionPwd, iter.iter), 1, '/', null);
	callback(...args);
}

export async function getSsns() {
	const sessions = await instance.get('/account/sessions');
	return sessions.data;
}

export async function postLogin(data = { email: 'anonymous@example.com', pwdEncrypted: '123456' }) {
	const user = await instance.post(`/account/log-in`, data);
	return user.data;
	// return { userUuid, nickname, sessionPwd, createdAt }
}

export async function postLogout(data = { userId: 'abc', createdAt: 0, sessionEncrypted: 'abc' }) {
	const result = await instance.post(`/account/log-out`, data);
	return result.data;
	// return { message }
}

export async function postCheck(data = { email: '', nickname: '' }) {
	const check = await instance.post('/account/check', data);
	return check.data;
	// return { email:true/false, nickname:true/false }
}

export async function postSignup(
	data = {
		email: 'anonymous@example.com',
		name: 'abc',
		nickname: 'anonymous',
		salt: 'abc',
		pwdEncrypted: '123456',
	},
) {
	const user = await instance.post(`/account/sign-up`, data);
	return user.data;
	// return { userUuid, nickname, sessionPwd, createdAt }
}
