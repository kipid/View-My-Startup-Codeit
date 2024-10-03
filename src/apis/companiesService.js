import instance from './instance.js';

export async function getCompanies(params = { skip: 0, take: 20, sort: 'recent', keyword: '' }) {
	const companies = await instance.get(`/companies`, { params });
	return companies.data;
}

export async function getCompanyWithId(id) {
	const company = await instance.get(`/companies/${id}`);
	return company.data;
}
