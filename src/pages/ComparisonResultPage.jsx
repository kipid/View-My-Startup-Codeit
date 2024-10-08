import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../shared/mock/mock.js';
import styles from './ComparisonResultPage.module.css';
import Modal from '../components/Modal.jsx';
import InvestmentUpdateModal from '../components/InvestmentUpdateModal.jsx';
import { getCompanies } from '../shared/apis/companiesService.js';
import useAsync from '../shared/hooks/useAsync.js';
import noLogo from '../assets/no-logo.png';
import getScaledNumber from '../shared/utils/getScaledNumber.js';

function ComparisonResultPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPending, errorLoadingCompanies, loadCompaniesAsync, setError] = useAsync(getCompanies);

	const companies = COMPANY.slice(0, 5); // FIXME 임시 mock 데이터
	const myCompany = companies[1]; // FIXME 임시 나의 기업

	const investmentModalHandler = () => {
		setIsModalOpen(true);
	};

	return (
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
						<div className={styles.companyInfo}>
							<img className={styles.companyLogo} src={myCompany.logo} alt="로고" />
							<div className={styles.comanyInfoText}>
								<p className={styles.companyName}>{myCompany.name}</p>
								<p className={styles.companyCategory}>{myCompany.category}</p>
							</div>
						</div>
					</div>
					<div className={styles.resultWrapper}>
						<p className={styles.title}>비교 결과 확인하기</p>
						<div className={styles.tableContainer}>
							<table>
								<tbody>
									<tr>
										<th>기업 명</th>
										<th>기업 소개</th>
										<th>카테고리</th>
										<th>누적 투자 금액</th>
										<th>매출액</th>
										<th>고용 인원</th>
									</tr>
									{companies.map((company, i) => {
										return (
											<tr key={company.id}>
												<td>
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
						</div>
					</div>
					<div className={styles.resultWrapper}>
						<p className={styles.title}>기업 순위 확인하기</p>
						<div> </div>
					</div>
					<button className={styles.investmentModalButton} onClick={investmentModalHandler} type="button">
						나의 기업에 투자하기
					</button>
					{isModalOpen && (
						<Modal>
							<InvestmentUpdateModal investmentDetail={myCompany} onClose={() => setIsModalOpen(false)} onUpdate show />
						</Modal>
					)}
				</div>
			</div>
		</div>
	);
}

export default ComparisonResultPage;
