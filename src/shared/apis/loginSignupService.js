import encrypt from './encrypt.js';
import instance from './instance.js';

export async function postPwdIter(data = { email: '' }) {
	const iter = await instance.post(`/account/iter`, data);
	return iter.data;
	// return { iter: Number, salt: String }
}

export async function postSsnIter(data = { userId: '', createdAt: 0 }) {
	const iter = await instance.post(`/account/session-iter`, data);
	return iter.data;
	// return { iter: Number, sessionSalt: String }
}

export async function postSsnAndCallback(callback, args, { userId = '', createdAt = 0, sessionPwd = '' }) {
	// data = { userId: '', createdAt: 0, sessionPwd: '' }
	const iter = await postSsnIter({ userId, createdAt });
	if (sessionPwd) {
		const sessionEncrypted = encrypt(iter.sessionSalt, sessionPwd, iter.iter);
		return callback({
			userId,
			createdAt,
			sessionEncrypted,
			...args,
		});
	}
}

export async function postSsns(data = { userId: '', createdAt: 0, sessionEncrypted: '' }) {
	const sessions = await instance.post('/account/sessions', data);
	return sessions.data;
}

export async function postLogin(data = { email: '', pwdEncrypted: '' }) {
	const user = await instance.post(`/account/log-in`, data);
	return user.data;
	// return { userUuid, nickname, sessionPwd, createdAt }
}

export async function postLogout(data = { userId: '', createdAt: 0, sessionEncrypted: '' }) {
	const result = await instance.post(`/account/log-out`, data);
	return result.data;
	// return { message }
}

export async function postLogoutFromAll(data = { userId: '', createdAt: 0, sessionEncrypted: '' }) {
	const result = await instance.post(`/account/log-out-from-all`, data);
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
		email: '',
		name: '',
		nickname: '',
		salt: '',
		pwdEncrypted: '',
	},
) {
	const user = await instance.post(`/account/sign-up`, data);
	return user.data;
	// return { userUuid, nickname, sessionPwd, createdAt }
}
