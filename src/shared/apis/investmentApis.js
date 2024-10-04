import instance from './instance.js';

export async function getInvestments(params = { page: 0, pageSize: 10, orderBy: 'bigger' }) {
	const investments = await instance.get(`/investments`, params);

	return investments;
}

export async function getInvestmentsTotalAmount() {
	const totalAmount = await instance.get(`/investments/total`);

	return totalAmount;
}

export async function updateInvestment(id, body) {
	const investment = await instance.patch(`/investments/${id}`, body);

	return investment;
}
