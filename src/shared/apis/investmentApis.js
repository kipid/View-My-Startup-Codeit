import { axiosGet, axiosPatch } from '../utils/axiosUtils.js';

export async function getInvestments(params = { page: 0, pageSize: 10, orderBy: 'bigger' }) {
	const investments = await axiosGet(`/investments`, params);

	return investments;
}

export async function getInvestmentsTotalAmount() {
	const totalAmount = await axiosGet(`/investments/total`);

	return totalAmount;
}

export async function updateInvestment(id, body) {
	const investment = await axiosPatch(`/investments/${id}`, body);

	return investment;
}
