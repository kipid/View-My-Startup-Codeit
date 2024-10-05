import { useEffect, useState } from 'react';
import styles from './InvestmentStatusPage.module.css';
import Pagination from '../components/Pagination';
import { getCompanies } from '../shared/apis/companiesService';
import useAsync from '../shared/hooks/useAsync';

function InvestmentStatusPage() {
	const [sort, setSort] = useState('accumulInvestByVMSDesc');
	const [companies, setCompanies] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [pageNumMax, setPageNumMax] = useState(1);
	const [isPending, error, getCompaniesAsync, setError] = useAsync(getCompanies);

	useEffect(() => {
		const fetch = async () => {
			const companiesData = await getCompaniesAsync({ skip: pageSize * (pageNum - 1), take: pageSize, sort });
			setCompanies(companiesData.list);
		};
	}, [pageSize, pageNum, sort, getCompaniesAsync]);

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
			<table>
				<tbody>
					<colgroup>
						<col width="5%" />
					</colgroup>
					<colgroup>
						<col width="15%" />
					</colgroup>
					<colgroup>
						<col width="30%" />
					</colgroup>
					<colgroup>
						<col width="10%" />
					</colgroup>
					<colgroup>
						<col width="20%" />
					</colgroup>
					<colgroup>
						<col width="20%" />
					</colgroup>
					<th>
						<td>순위</td>
						<td>기업 명</td>
						<td>기업 소개</td>
						<td>카테고리</td>
						<td>View My Startup 투자 금액</td>
						<td>실제 누적 투자 금액</td>
					</th>
					{companies.map(company => {
						return (
							<tr key={company.id}>
								<td>x위</td>
								<td>company.name</td>
								<td>company.description</td>
								<td>company.category</td>
								<td>company.accumulInvestByVMS</td>
								<td>company.accumulInvest</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Pagination pageNum={pageNum} setPageNum={setPageNum} pageNumMax={pageNumMax} />
		</>
	);
}

export default InvestmentStatusPage;
