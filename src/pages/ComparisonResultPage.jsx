import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCompanies } from '../shared/apis/companiesService.js';
import useAsync from '../shared/hooks/useAsync.js';
import getScaledNumber from '../shared/utils/getScaledNumber.js';
import Modal from '../components/Modal.jsx';
import InvestmentUpdateModal from '../components/InvestmentUpdateModal.jsx';
import noLogo from '../assets/no-logo.png';
import styles from './ComparisonResultPage.module.css';

function MyCompanyBox({ companies, myCompanyId }) {
	const myCompany = companies.find(company => company.id === myCompanyId);

	return (
		<div className={styles.companyInfo}>
			<img className={styles.companyLogo} src={myCompany.logo ? myCompany.logo : noLogo} alt="로고" />
			<div className={styles.comanyInfoText}>
				<p className={styles.companyName}>{myCompany.name}</p>
				<p className={styles.companyCategory}>{myCompany.category}</p>
			</div>
		</div>
	);
}

function ResultTable({ myCompanyId, comparisonIds, companies }) {
	const resultList = [myCompanyId, ...comparisonIds];

	return (
		<table className={styles.resultTable}>
			<tbody>
				<tr>
					<th>기업 명</th>
					<th>기업 소개</th>
					<th>카테고리</th>
					<th>누적 투자 금액</th>
					<th>매출액</th>
					<th>고용 인원</th>
				</tr>
				{companies
					.filter(company => resultList.includes(company.id))
					.map(company => {
						return (
							<tr key={company.id}>
								<td className={styles.companyNameCell}>
									<img className={styles.logo} src={company.logo ? company.logo : noLogo} alt="Company Logo" />
									&nbsp; {company.name}
								</td>
								<td>{company.description}</td>
								<td>{company.category}</td>
								<td>{getScaledNumber(company.accumulInvest)}원</td>
								<td>{getScaledNumber(company.revenue)}원</td>
								<td>{getScaledNumber(company.employees)}명</td>
							</tr>
						);
					})}
			</tbody>
		</table>
	);
}

function RankingTable({ myCompanyId, companies }) {
	const myCompanyIndex = companies.findIndex(company => company.id === myCompanyId);
	let start = Math.max(0, myCompanyIndex - 2);
	let end = Math.min(companies.length, myCompanyIndex + 3);

	if (myCompanyIndex === 0) {
		end = Math.min(5, companies.length);
	} else if (myCompanyIndex === 1) {
		start = 0;
		end = Math.min(5, companies.length);
	} else if (myCompanyIndex >= companies.length - 2) {
		start = Math.max(0, companies.length - 5);
	}

	const rankingList = companies.slice(start, end);

	return (
		<table className={styles.rankingTable}>
			<tbody>
				<tr>
					<th>순위</th>
					<th>기업 명</th>
					<th>기업 소개</th>
					<th>카테고리</th>
					<th>누적 투자 금액</th>
					<th>매출액</th>
					<th>고용 인원</th>
				</tr>
				{rankingList.map((company, index) => {
					const rank = start + index + 1;
					return (
						<tr key={company.id}>
							<td>{rank}위</td>
							<td className={styles.companyNameCell}>
								<img className={styles.logo} src={company.logo ? company.logo : noLogo} alt="Company Logo" />
								&nbsp; {company.name}
							</td>
							<td>{company.description}</td>
							<td>{company.category}</td>
							<td>{getScaledNumber(company.accumulInvest)}원</td>
							<td>{getScaledNumber(company.revenue)}원</td>
							<td>{getScaledNumber(company.employees)}명</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

function ComparisonResultPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [myCompanyId, setMyCompanyId] = useState('');
	const [comparisonIds, setComparisonIds] = useState([]);
	const [resultCompanies, setResultCompanies] = useState([]);
	const [rankingCompanies, setRankingCompanies] = useState([]);
	const [resultSort, setResultSort] = useState();
	const [rankingSort, setRankingSort] = useState();
	const [isPending, errorLoadingCompanies, loadCompaniesAsync, setError] = useAsync(getCompanies);

	const investmentModalHandler = () => {
		setIsModalOpen(true);
	};

	useEffect(() => {
		// session에 저장된 선택 기업 데이터 불러오기
		const getMyCompanyData = sessionStorage.getItem('myCompanyId');
		const getComparisonData = sessionStorage.getItem('comparisonIds');
		if (getMyCompanyData) {
			setMyCompanyId(JSON.parse(getMyCompanyData));
		}
		if (getComparisonData) {
			setComparisonIds(JSON.parse(getComparisonData));
		}
	}, []);

	useEffect(() => {
		const fetchResultCompanies = async () => {
			try {
				const result = await loadCompaniesAsync({ take: 100, sort: resultSort });
				if (!result) {
					return;
				}
				setResultCompanies(result.list);
			} catch (err) {
				setError(err);
			}
		};

		fetchResultCompanies();
	}, [resultSort]);

	useEffect(() => {
		const fetchRankingCompanies = async () => {
			try {
				const result = await loadCompaniesAsync({ take: 100, sort: rankingSort });
				if (!result) {
					return;
				}
				setRankingCompanies(result.list);
			} catch (err) {
				setError(err);
			}
		};

		fetchRankingCompanies();
	}, [rankingSort]);

	return (
		rankingCompanies.length > 0 && (
			<div>
				<div className={styles.comparisonResultPage}>
					<div className={styles.container}>
						<div className={styles.myCompanyHeader}>
							<p className={styles.title}>내가 선택한 기업</p>
							<Link to="/my-comparison" className={styles.restartLink}>
								<button className={styles.restartButton} type="button">
									다른 기업 비교하기
								</button>
							</Link>
						</div>
						<div className={styles.myCompanyWrapper}>
							<MyCompanyBox companies={resultCompanies} myCompanyId={myCompanyId} />
						</div>

						<div className={styles.resultWrapper}>
							<div className={styles.subHeader}>
								<p className={styles.title}>비교 결과 확인하기</p>
								<select className={styles.selectOption} value={resultSort} onChange={e => setResultSort(e.target.value)}>
									<option value="recent">최신순</option>
									<option value="accumulInvestDesc">누적 투자금액 높은순</option>
									<option value="accumulInvestAsc">누적 투자금액 낮은순</option>
									<option value="earningDesc">매출액 높은순</option>
									<option value="earningAsc">매출액 낮은순</option>
									<option value="employeeDesc">고용 인원 많은순</option>
									<option value="employeeAsc">고용 인원 적은순</option>
								</select>
							</div>
							<div className={styles.tableContainer}>
								<ResultTable myCompanyId={myCompanyId} comparisonIds={comparisonIds} companies={resultCompanies} />
							</div>
						</div>

						<div className={styles.rankingWrapper}>
							<div className={styles.subHeader}>
								<p className={styles.title}>기업 순위 확인하기</p>
								<select className={styles.selectOption} value={rankingSort} onChange={e => setRankingSort(e.target.value)}>
									<option value="recent">최신순</option>
									<option value="accumulInvestDesc">누적 투자금액 높은순</option>
									<option value="accumulInvestAsc">누적 투자금액 낮은순</option>
									<option value="earningDesc">매출액 높은순</option>
									<option value="earningAsc">매출액 낮은순</option>
									<option value="employeeDesc">고용 인원 많은순</option>
									<option value="employeeAsc">고용 인원 적은순</option>
								</select>
							</div>
							<div className={styles.tableContainer}>
								<RankingTable myCompanyId={myCompanyId} companies={rankingCompanies} />
							</div>
						</div>

						<button className={styles.investmentModalButton} onClick={investmentModalHandler} type="button">
							나의 기업에 투자하기
						</button>
						{isModalOpen && (
							<Modal>
								<InvestmentUpdateModal investmentDetail={myCompanyId} onClose={() => setIsModalOpen(false)} onUpdate show />
							</Modal>
						)}
					</div>
				</div>
			</div>
		)
	);
}

export default ComparisonResultPage;
