import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './InvestmentStatusPage.module.css';
import Pagination from '../components/Pagination.jsx';
import { getCompanies } from '../shared/apis/companiesService.js';
import { getMyInvestments } from '../shared/apis/investmentApis.js';
import useAsync from '../shared/hooks/useAsync.js';
import PopUp from '../components/PopUp.jsx';
import getScaledNumber from '../shared/utils/getScaledNumber.js';
import noLogo from '../assets/no-logo.png';
import { useUser } from '../context/UserProvider.jsx';

function InvestmentStatusPage() {
	const [activeTab, setActiveTab] = useState('all');
	const [sort, setSort] = useState(null);
	const [companies, setCompanies] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [pageNumMax, setPageNumMax] = useState(1);
	const [isPending, error, getCompaniesAsync, setError] = useAsync(getCompanies);
	const [isMyInvPending, myInvError, getMyInvestmentsAsync, setMyInvError] = useAsync(getMyInvestments);
	const userId = useUser()?.userUuid;
	const isAllTab = activeTab === 'all';

	useEffect(() => {
		setPageNum(1);
		const fetch = async () => {
			if (isAllTab) {
				const companiesData = await getCompaniesAsync({ skip: 0, take: 1000, keyword: '', include: 'investments' });
				setPageNumMax(companiesData?.totalCount ? Math.ceil(companiesData.totalCount / pageSize) : 1);
				const companiesList = companiesData.list.map(company => {
					return { ...company, accumulInvestByVMS: company.investments.reduce((acc, invest) => acc + Number(invest.amount), 0) };
				});
				setCompanies(companiesList.sort((a, b) => b.accumulInvestByVMS - a.accumulInvestByVMS));
				setSort('accumulInvestByVMSDesc');
			} else {
				const companiesData = await getMyInvestmentsAsync({ page: 1, pageSize: 1000 }, userId);
				setPageNumMax(companiesData?.totalCount ? Math.ceil(companiesData.totalCount / pageSize) : 1);
				const companiesList = companiesData.list.map(invest => {
					return { ...invest.company, amount: invest.amount };
				});
				setCompanies(companiesList.sort((a, b) => b.amount - a.amount));
				setSort('myInvestmentDesc');
				console.log(pageNum, pageNumMax, pageSize, sort, companies);
			}
		};
		fetch();
	}, [activeTab]);

	useEffect(() => {
		let sortFn = (a, b) => a - b;
		switch (sort) {
			case 'myInvestmentAsc':
				sortFn = (a, b) => a.amount - b.amount;
				break;
			case 'myInvestmentDesc':
				sortFn = (a, b) => b.amount - a.amount;
				break;
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
				if (isAllTab) {
					sortFn = (a, b) => b.accumulInvestByVMS - a.accumulInvestByVMS; // 'all' tab: accumulInvestByVMSDesc
				} else {
					sortFn = (a, b) => b.amount - a.amount; // 'mine' tab: myInvestmentDesc
				}
				break;
		}
		switch (sort) {
			case 'myInvestmentAsc':
			case 'myInvestmentDesc': {
				let rank = 1;
				let prevCompany = null;
				let offset = 1;
				const rankedCompanies = companies.sort(sortFn).map(company => {
					if (prevCompany && prevCompany.amount !== company.amount) {
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
			case 'accumulInvestAsc':
			case 'accumulInvestDesc': {
				let rank = 1;
				let prevCompany = null;
				let offset = 1;
				const rankedCompanies = companies.sort(sortFn).map(company => {
					if (prevCompany && prevCompany.accumulInvest !== company.accumulInvest) {
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
			case 'accumulInvestByVMSAsc':
			case 'accumulInvestByVMSDesc':
			default: {
				let rank = 1;
				let prevCompany = null;
				let offset = 1;
				const rankedCompanies = companies.sort(sortFn).map(company => {
					if (prevCompany && prevCompany.accumulInvestByVMS !== company.accumulInvestByVMS) {
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
				<div>
					<h2 className={isAllTab ? '' : styles.inactive} onClick={() => setActiveTab('all')}>
						전체 투자 현황
					</h2>
					{userId && (
						<h2 className={isAllTab ? styles.inactive : ''} onClick={() => setActiveTab('mine')}>
							나의 투자 현황
						</h2>
					)}
				</div>
				{isAllTab ? (
					<select value={sort} onChange={e => setSort(e.target.value)}>
						<option value="accumulInvestByVMSDesc">View My Startup 투자 금액 높은순</option>
						<option value="accumulInvestByVMSAsc">View My Startup 투자 금액 낮은순</option>
						<option value="accumulInvestDesc">실제 누적 투자 금액 높은순</option>
						<option value="accumulInvestAsc">실제 누적 투자 금액 낮은순</option>
					</select>
				) : (
					<select value={sort} onChange={e => setSort(e.target.value)}>
						<option value="myInvestmentDesc">나의 투자 금액 높은순</option>
						<option value="myInvestmentAsc">나의 투자 금액 낮은순</option>
						<option value="accumulInvestDesc">실제 누적 투자 금액 높은순</option>
						<option value="accumulInvestAsc">실제 누적 투자 금액 낮은순</option>
					</select>
				)}
			</div>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<tbody>
						<tr>
							<th>순위</th>
							<th>기업 명</th>
							<th>기업 소개</th>
							<th>카테고리</th>
							<th>{isAllTab ? 'View My Startup 투자 금액' : '나의 투자 금액'}</th>
							<th>실제 누적 투자 금액</th>
						</tr>
						{companies
							.filter((company, i) => i >= pageSize * (pageNum - 1) && i < pageSize * pageNum)
							.map((company, i) => {
								return (
									<tr key={`${company.id}-${i + 1}`}>
										<td>{company.rank}위</td>
										<td>
											<Link to={`/companies/${company.id}`}>
												<img className={styles.logo} src={company.logo ? company.logo : noLogo} alt="Company Logo" />
												&nbsp; {company.name}
											</Link>
										</td>
										<td>{company.description}</td>
										<td>{company.category}</td>
										<td>{isAllTab ? getScaledNumber(company.accumulInvestByVMS) : getScaledNumber(company.amount)}</td>
										<td>{getScaledNumber(company.accumulInvest)}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			<Pagination pageNum={pageNum} setPageNum={setPageNum} pageNumMax={pageNumMax} />
			<PopUp error={error} popUpText={error?.message} setError={setError || setMyInvError} />
		</>
	);
}

export default InvestmentStatusPage;
