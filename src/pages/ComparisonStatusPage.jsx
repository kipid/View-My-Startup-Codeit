import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './InvestmentStatusPage.module.css';
import Pagination from '../components/Pagination';
import PopUp from '../components/PopUp';
import useAsync from '../shared/hooks/useAsync';
import { getCompanies } from '../shared/apis/companiesService';
import noLogo from '../assets/no-logo.png';

function ComparisonStatusPage() {
	const [sort, setSort] = useState(null);
	const [companies, setCompanies] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [pageNumMax, setPageNumMax] = useState(1);
	const [isPending, error, getCompaniesAsync, setError] = useAsync(getCompanies);

	useEffect(() => {
		setPageNum(1);
		const fetch = async () => {
			const companiesData = await getCompaniesAsync({ skip: 0, take: 1000, keyword: '', include: 'watcherAndComparison' });
			setPageNumMax(companiesData?.totalCount ? Math.ceil(companiesData.totalCount / pageSize) : 1);
			setCompanies(companiesData.list.sort((a, b) => b._count.watcherList - a._count.watcherList));
			setSort('accumulInvestByVMSDesc');
		};
		fetch();
	}, []);

	useEffect(() => {
		let sortFn = (a, b) => a - b;
		switch (sort) {
			case 'comparisonAsc':
				sortFn = (a, b) => a._count.comparisons - b._count.comparisons;
				break;
			case 'comparisonDesc':
				sortFn = (a, b) => b._count.comparisons - a._count.comparisons;
				break;
			case 'watcherAsc':
				sortFn = (a, b) => a._count.watcherList - b._count.watcherList;
				break;
			case 'watcherDesc':
			default:
				sortFn = (a, b) => b._count.watcherList - a._count.watcherList;
				break;
		}
		switch (sort) {
			case 'comparisonAsc':
			case 'comparisonDesc': {
				let rank = 1;
				let prevCompany = null;
				let offset = 1;
				const rankedCompanies = companies.sort(sortFn).map(company => {
					if (prevCompany && prevCompany._count.comparisons !== company._count.comparisons) {
						rank += offset;
						offset = 1;
					} else if (prevCompany) {
						offset += 1;
					}
					prevCompany = company;
					return { ...company, rank };
				});
				setCompanies(rankedCompanies);
				break;
			}
			case 'watcherAsc':
			case 'watcherDesc':
			default: {
				let rank = 1;
				let prevCompany = null;
				let offset = 1;
				const rankedCompanies = companies.sort(sortFn).map(company => {
					if (prevCompany && prevCompany._count.watcherList !== company._count.watcherList) {
						rank += offset;
						offset = 1;
					} else if (prevCompany) {
						offset += 1;
					}
					prevCompany = company;
					return { ...company, rank };
				});
				setCompanies(rankedCompanies);
				break;
			}
		}
	}, [sort]);

	return (
		<>
			<div className={styles.heads}>
				<h2>비교 현황</h2>
				<select value={sort} onChange={e => setSort(e.target.value)}>
					<option value="watcherDesc">나의 기업 선택 높은순</option>
					<option value="watcherAsc">나의 기업 선택 낮은순</option>
					<option value="comparisonDesc">비교 기업 선택 높은순</option>
					<option value="comparisonAsc">비교 기업 선택 낮은순</option>
				</select>
			</div>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
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
										<td>{company.rank}위</td>
										<td>
											<Link to={`/companies/${company.id}`}>
												<img className={styles.logo} src={company.logo ? company.logo : noLogo} alt="Company Logo" />
												&nbsp; {company.name}
											</Link>
										</td>
										<td>{company.description}</td>
										<td>{company.category}</td>
										<td>{company._count.watcherList}</td>
										<td>{company._count.comparisons}</td>
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
