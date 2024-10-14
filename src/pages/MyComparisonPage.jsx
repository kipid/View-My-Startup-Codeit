import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal.jsx';
import SelectMyCompanyModal from '../components/SelectMyCompanyModal.jsx';
import SelectComparisonModal from '../components/SelectComparisonModal.jsx';
import styles from './MyComparisonPage.module.css';
import addIcon from '../assets/ic_add.png';
import restartIcon from '../assets/ic_restart.png';
import noLogo from '../assets/no-logo.png';
import minusLogo from '../assets/ic_minus.png';
import { useUser } from '../context/UserProvider.jsx';
import { createComparison, createWatch } from '../shared/apis/companiesService.js';

function MyComparisonPage() {
	const [isMyCompanyModalOpen, setIsMyCompanyModalOpen] = useState(false);
	const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
	const [myCompany, setMyCompany] = useState('');
	const [comparisons, setComparisons] = useState([]);
	const navigate = useNavigate();

	const myCompanyModalHandler = () => {
		setIsMyCompanyModalOpen(true);
	};

	const myCompanyModalCloseHandler = newMyCompany => {
		setMyCompany(newMyCompany);
		setIsMyCompanyModalOpen(false);
	};

	const comparisonModalHandler = () => {
		setIsComparisonModalOpen(true);
	};

	const comparisonModalCloseHandler = newComparisons => {
		setComparisons(newComparisons);
		setIsComparisonModalOpen(false);
	};

	const handleDeleteMyCompany = id => {
		setMyCompany('');
	};

	const handleDeleteComparison = id => {
		setComparisons(prev => prev.filter(comparison => comparison.id !== id));
	};

	const handleRestart = () => {
		setMyCompany('');
		setComparisons([]);
	};

	const userId = useUser()?.userUuid;
	const handleCompareButton = async () => {
		const selectedCompanyIds = comparisons.map(comparison => comparison.id);
		const companyId = myCompany.id;

		try {
			const result = await createComparison({ selectedCompanyIds, userId });
			if (result) {
				sessionStorage.setItem('comparisonIds', JSON.stringify(selectedCompanyIds));
			} else {
				return null;
			}
		} catch (error) {
			console.error('createComparison error:', error.response ? error.response.data : error.message);
		}

		try {
			const result = await createWatch({ companyId, userId });
			if (result) {
				sessionStorage.setItem('myCompanyId', JSON.stringify(companyId));
			} else {
				return null;
			}
		} catch (error) {
			console.error('createWatch error:', error.response ? error.response.data : error.message);
		}
		navigate('/my-comparison/result');
	};

	return (
		<div className={styles.myComparisonPage}>
			<div className={styles.container}>
				<div className={styles.myCompanyHeader}>
					<p className={styles.title}>나의 기업을 선택해 주세요!</p>
					{myCompany && comparisons.length > 0 && (
						<button className={styles.restartButton} onClick={handleRestart} type="button">
							<img className={styles.restartIcon} src={restartIcon} alt="초기화" />
							전체 초기화
						</button>
					)}
				</div>
				<div className={styles.myCompanyWrapper}>
					{!myCompany ? (
						<div className={styles.addMyCompanyIcon}>
							<button className={styles.addButton} onClick={myCompanyModalHandler} type="button">
								<img className={styles.addIcon} src={addIcon} alt="추가" />
							</button>
							<p className={styles.addMyCompanyText}>기업 추가</p>
						</div>
					) : (
						<>
							<p className={styles.cancelMyCompany} onClick={() => handleDeleteMyCompany()}>
								선택 취소
							</p>
							<div className={styles.companyInfo}>
								<img className={styles.companyLogo} src={myCompany.logo ? myCompany.logo : noLogo} alt="로고" />
								<div className={styles.companyInfoText}>
									<p className={styles.companyName}>{myCompany.name}</p>
									<p className={styles.companyCategory}>{myCompany.category}</p>
								</div>
							</div>
						</>
					)}
					{isMyCompanyModalOpen && (
						<Modal>
							<SelectMyCompanyModal onClose={myCompanyModalCloseHandler} />
						</Modal>
					)}
				</div>
				{myCompany && (
					<>
						<div className={styles.comparisonHeader}>
							<div className={styles.titles}>
								<p className={styles.title}>어떤 기업이 궁금하세요?</p>
								<p className={styles.subtitle}>(최대 5개)</p>
							</div>
							<button
								className={`${styles.addComparisonButton} ${comparisons.length < 5 ? styles.active : styles.inactive}`}
								onClick={comparisonModalHandler}
								disabled={comparisons.length === 5}
								type="button"
							>
								기업 추가하기
							</button>
							{isComparisonModalOpen && (
								<Modal>
									<SelectComparisonModal
										myCompanyId={myCompany.id}
										comparisons={comparisons}
										onClose={comparisonModalCloseHandler}
									/>
								</Modal>
							)}
						</div>
						<div className={styles.comparisonWrapper}>
							{comparisons.length === 0 ? (
								<p className={styles.noComparisonText}>
									아직 추가한 기업이 없어요, <br />
									버튼을 눌러 기업을 추가해보세요!
								</p>
							) : (
								comparisons.map(comparison => (
									<div className={styles.comparisonInfo} key={comparison.id}>
										<img
											className={styles.minusLogo}
											src={minusLogo}
											alt="삭제"
											onClick={() => handleDeleteComparison(comparison.id)}
										/>
										<img className={styles.companyLogo} src={comparison.logo ? comparison.logo : noLogo} alt="로고" />
										<div className={styles.companyInfoText}>
											<p className={styles.companyName}>{comparison.name}</p>
											<p className={styles.companyCategory}>{comparison.category}</p>
										</div>
									</div>
								))
							)}
						</div>
					</>
				)}
				<button
					className={`${styles.compareButton} ${myCompany && comparisons.length > 0 ? styles.active : styles.inactive}`}
					type="button"
					disabled={!myCompany || comparisons.length === 0}
					onClick={handleCompareButton}
				>
					기업 비교하기
				</button>
			</div>
		</div>
	);
}

export default MyComparisonPage;
