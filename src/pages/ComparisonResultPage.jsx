import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../shared/mock/mock.js';
import styles from './ComparisonResultPage.module.css';
import Modal from '../components/Modal.jsx';
import InvestmentUpdateModal from '../components/InvestmentUpdateModal.jsx';

function ComparisonResultPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const companies = COMPANY; // FIXME 임시 mock 데이터
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
						<div> </div>
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
