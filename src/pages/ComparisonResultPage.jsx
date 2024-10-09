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
		<table className={styles.table}>
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

function ComparisonResultPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [myCompanyId, setMyCompanyId] = useState('');
	const [comparisonIds, setComparisonIds] = useState([]);
	const [companies, setCompanies] = useState([]);
	const [sort, setSort] = useState();
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
		const fetchCompanies = async () => {
			try {
				const result = await loadCompaniesAsync({ take: 100 });
				if (!result) {
					console.error('No results returned');
					return;
				}
				setCompanies(result.list);
			} catch (err) {
				setError(err);
			}
		};

		fetchCompanies();
	}, []);

	return (
		companies.length > 0 && (
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
							<MyCompanyBox companies={companies} myCompanyId={myCompanyId} />
						</div>

						<div className={styles.resultWrapper}>
							<p className={styles.title}>비교 결과 확인하기</p>
							<div className={styles.tableContainer}>
								<ResultTable myCompanyId={myCompanyId} comparisonIds={comparisonIds} companies={companies} />
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
