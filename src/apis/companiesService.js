import instance from './instance.js';

export async function getCompanies(params = { skip: 0, take: 20, sort: 'recent', keyword: '' }) {
	// try {
	const companies = await instance.get(`/companies`, { params });
	return companies.data;
	// }
	// catch (err) {
	// 	return err?.response?.data || err;
	// }
}

export async function getCompanyWithId(id) {
	try {
		const company = await instance.get(`/companies/${id}`);
		return company.data;
	} catch (err) {
		return err?.response?.data || err;
	}
}
