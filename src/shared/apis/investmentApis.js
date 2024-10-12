import { axiosDelete, axiosGet, axiosPatch, axiosPost } from '../utils/axiosUtils.js';

export async function getInvestments(params = { page: 0, pageSize: 10, orderBy: 'bigger' }, companyId = '') {
	const investments = await axiosGet(`/investments/${companyId}`, params);

	return investments;
}

export async function getInvestmentsTotalAmount(companyId) {
	const totalAmount = await axiosGet(`/investments/${companyId}/total`);

	return totalAmount;
}

export async function postInvestment(body) {
	const investment = await axiosPost(`/investments`, body);

	return investment;
}

export async function updateInvestment(id, body) {
	const investment = await axiosPatch(`/investments/${id}`, body);

	return investment;
}

export async function deleteInvestment(id, body) {
	const investment = await axiosDelete(`/investments/${id}`, body);

	return investment;
}
