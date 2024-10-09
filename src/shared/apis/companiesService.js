import instance from './instance.js';

export async function getCompanies(params = { skip: 0, take: 10, sort: 'recent', keyword: '' }) {
	const companies = await instance.get(`/companies/`, { params });
	return companies.data;
}

export async function getCompanyWithId(id) {
	const company = await instance.get(`/companies/${id}`);
	return company.data;
}

// Comparison과 Watch 추가
export async function createComparison(body) {
	const comparison = await instance.post(`/comparisons/select`, body);
	return comparison.data;
}

export async function createWatch(body) {
	const watch = await instance.post(`/watches/select`, body);
	return watch.data;
}
