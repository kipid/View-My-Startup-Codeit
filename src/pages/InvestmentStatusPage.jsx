import { useEffect, useState } from 'react';
import styles from './InvestmentStatusPage.module.css';
import Pagination from '../components/Pagination';
import { getCompanies } from '../shared/apis/companiesService';
import useAsync from '../shared/hooks/useAsync';
import PopUp from '../components/PopUp';
import getScaledNumber from '../shared/utils/getScaledNumber';
import noLogo from '../assets/no-logo.png';

function InvestmentStatusPage() {
	const [sort, setSort] = useState('accumulInvestByVMSDesc');
	const [companies, setCompanies] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [pageNumMax, setPageNumMax] = useState(1);
	const [isPending, error, getCompaniesAsync, setError] = useAsync(getCompanies);

	useEffect(() => {
		setPageNum(1);
		setSort('accumulInvestByVMSDesc');
		const fetch = async () => {
			const companiesData = await getCompaniesAsync({ skip: 0, take: 1000, keyword: '', include: 'investments' });
			setPageNumMax(companiesData?.totalCount ? Math.ceil(companiesData.totalCount / pageSize) : 1);
			const companiesList = companiesData.list.map(company => {
				return { ...company, accumulInvestByVMS: company.investments.reduce((acc, invest) => acc + invest.amount, 0) };
			});
			setCompanies(companiesList.sort((a, b) => b.accumulInvestByVMS - a.accumulInvestByVMS));
		};
		fetch();
	}, []);

	useEffect(() => {
		let sortFn = (a, b) => a - b;
		switch (sort) {
			case 'accumulInvestAsc':
				sortFn = (a, b) => a.accumulInvest - b.accumulInvest;
				break;
			case 'accumulInvestDesc':
				sortFn = (a, b) => b.accumulInvest - a.accumulInvest;
				break;
			case 'accumulInvestByVMSAsc':
				sortFn = (a, b) => a.accumulInvestByVMS - b.accumulInvestByVMS;
				break;
			case 'accumulInvestByVMSDesc':
			default:
				sortFn = (a, b) => b.accumulInvestByVMS - a.accumulInvestByVMS;
				break;
		}
		setCompanies([...companies.sort(sortFn)]);
	}, [sort]);

	return (
		<>
			<div className={styles.heads}>
				<h2>투자 현황</h2>
				<select value={sort} onChange={e => setSort(e.target.value)}>
					<option value="accumulInvestByVMSDesc">View My Startup 투자 금액 높은순</option>
					<option value="accumulInvestByVMSAsc">View My Startup 투자 금액 낮은순</option>
					<option value="accumulInvestDesc">실제 누적 투자 금액 높은순</option>
					<option value="accumulInvestAsc">실제 누적 투자 금액 낮은순</option>
				</select>
			</div>
			<div className={styles.tableContainer}>
				<table>
					<tbody>
						<tr>
							<th>순위</th>
							<th>기업 명</th>
							<th>기업 소개</th>
							<th>카테고리</th>
							<th>View My Startup 투자 금액</th>
							<th>실제 누적 투자 금액</th>
						</tr>
						{companies
							.filter((company, i) => i >= pageSize * (pageNum - 1) && i < pageSize * pageNum)
							.map((company, i) => {
								return (
									<tr key={company.id}>
										<td>{i + 1 + pageSize * (pageNum - 1)}위</td>
										<td>
											<img className={styles.logo} src={company.logo ? company.logo : noLogo} alt="Company Logo" />
											&nbsp; {company.name}
										</td>
										<td>{company.description}</td>
										<td>{company.category}</td>
										<td>{getScaledNumber(company.accumulInvestByVMS)}</td>
										<td>{getScaledNumber(company.accumulInvest)}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			<Pagination pageNum={pageNum} setPageNum={setPageNum} pageNumMax={pageNumMax} />
			<PopUp error={error} popUpText={error?.message} setError={setError} />
		</>
	);
}

export default InvestmentStatusPage;
