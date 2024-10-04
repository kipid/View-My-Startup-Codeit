import instance from './instance.js';

export async function postPwdIter(data = { email: '' }) {
	const iter = await instance.post(`/account/iter`, data);
	return iter.data;
	// return { iter: Number, salt: String }
}

export async function postSsnIter(data = { id: '', createdAt: 0 }) {
	const iter = await instance.post(`/account/session-iter`, data);
	return iter.data;
	// return { iter: Number, salt: String }
}

export async function postLogin(data = { email: 'anonymous@example.com', pwdEncrypted: '123456' }) {
	const user = await instance.post(`/account/log-in`, data);
	return user.data;
	// return { userUuid, nickname, sessionPwd, createdAt }
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
