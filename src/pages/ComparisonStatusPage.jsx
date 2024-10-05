import { useEffect, useState } from 'react';
import styles from './InvestmentStatusPage.module.css';
import Pagination from '../components/Pagination';
import PopUp from '../components/PopUp';
import useAsync from '../shared/hooks/useAsync';
import getScaledNumber from '../shared/utils/getScaledNumber';
import { getCompanies } from '../shared/apis/companiesService';

function ComparisonStatusPage() {
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
			console.log(companiesData.list);
			setCompanies(companiesData.list.sort((a, b) => b.accumulInvest - a.accumulInvest));
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
				sortFn = (a, b) => a - b;
				break;
			case 'accumulInvestByVMSDesc':
			default:
				sortFn = (a, b) => a - b;
				break;
		}
		setCompanies([...companies.sort(sortFn)]);
	}, [sort]);

	return (
		<>
			<div className={styles.heads}>
				<h2>비교 현황</h2>
				<select value={sort} onChange={e => setSort(e.target.value)}>
					<option value="accumulInvestByVMSDesc">나의 기업 선택 높은순</option>
					<option value="accumulInvestByVMSAsc">나의 기업 선택 낮은순</option>
					<option value="accumulInvestDesc">비교 기업 선택 높은순</option>
					<option value="accumulInvestAsc">비교 기업 선택 낮은순</option>
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
							<th>나의 기업 선택 횟수</th>
							<th>비교 기업 선택 횟수</th>
						</tr>
						{companies
							.filter((company, i) => i >= pageSize * (pageNum - 1) && i < pageSize * pageNum)
							.map((company, i) => {
								return (
									<tr key={company.id}>
										<td>{i + 1 + pageSize * (pageNum - 1)}위</td>
										<td>{company.name}</td>
										<td>{company.description}</td>
										<td>{company.category}</td>
										<td>{company.accumulInvestByVMS}</td>
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

export default ComparisonStatusPage;
