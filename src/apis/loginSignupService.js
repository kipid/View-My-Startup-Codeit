import instance from './instance.js';

export async function postPwdIter(data = { email: '' }) {
	const iter = await instance.post(`/account/iter`, data);
	return iter.data;
	// return { iter: Number, salt: String }
}

export async function postLogin(data = { email: 'anonymous@example.com', pwdEncrypted: '123456' }) {
	const user = await instance.post(`/account/log-in`, data);
	return user.data;
}

export async function postSignup(
	data = { email: 'anonymous@example.com', nickname: 'anonymous', pwdEncrypted: '123456', pwdConfirm: 'confirmed' },
) {
	const user = await instance.post(`/account/sign-up`, data);
	return user.data;
}
