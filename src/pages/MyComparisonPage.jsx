import { useState } from 'react';
import Modal from '../components/Modal';
import SelectMyCompanyModal from '../components/SelectMyCompanyModal';
import SelectComparisonModal from '../components/SelectComparisonModal';
import styles from './MyComparisonPage.module.css';
import addIcon from '../assets/ic_add.png';
import restartIcon from '../assets/ic_restart.png';
import noLogo from '../assets/no-logo.png';
import minusLogo from '../assets/ic_minus.png';

function MyComparisonPage() {
	const [isMyCompanyModalOpen, setIsMyCompnayModalOpen] = useState(false);
	const [isComparisonModalOpen, setIsComaprisonModalOpen] = useState(false);
	const [myCompany, setMyComany] = useState('');
	const [comparisons, setComparisons] = useState([]);

	const myCompanyModalHandler = () => {
		setIsMyCompnayModalOpen(true);
	};

	const myCompanyModalCloseHandler = newMyCompany => {
		setMyComany(newMyCompany);
		setIsMyCompnayModalOpen(false);
	};

	const comparisonModalHandler = () => {
		setIsComaprisonModalOpen(true);
	};

	const comparisonModalCloseHandler = newComparisons => {
		setComparisons(newComparisons);
		setIsComaprisonModalOpen(false);
	};

	const handleDeleteMyCompany = id => {
		setMyComany('');
	};

	const handleDeleteComparison = id => {
		setComparisons(prev => prev.filter(comparison => comparison.id !== id));
	};

	const handleRestart = () => {
		setMyComany('');
		setComparisons('');
	};

	return (
		<div className={styles.myComparisonPage}>
			<div className={styles.container}>
				<div className={styles.myComanyHeader}>
					<p className={styles.title}>나의 기업을 선택해 주세요!</p>
					{myCompany && (
						<button type="button" className={styles.restartButton} onClick={handleRestart}>
							<img className={styles.restartIcon} src={restartIcon} alt="초기화" />
							전체 초기화
						</button>
					)}
				</div>
				<div className={styles.myCompanyWrapper}>
					{!myCompany ? (
						<div className={styles.addMyCompanyIcon}>
							<button type="button" className={styles.addButton} onClick={myCompanyModalHandler}>
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
								<div className={styles.comanyInfoText}>
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
				<div className={styles.comparisonHeader}>
					<div className={styles.titles}>
						<p className={styles.title}>어떤 기업이 궁금하세요?</p>
						<p className={styles.subtitle}>(최대 5개)</p>
					</div>
					<button
						type="button"
						className={`${styles.addComparisonButton} ${comparisons.length < 5 ? styles.active : styles.inactive}`}
						onClick={comparisonModalHandler}
						disabled={comparisons.length === 5}
					>
						기업 추가하기
					</button>
					{isComparisonModalOpen && (
						<Modal>
							<SelectComparisonModal comparisons={comparisons} onClose={comparisonModalCloseHandler} />
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
								<div className={styles.comanyInfoText}>
									<p className={styles.companyName}>{comparison.name}</p>
									<p className={styles.companyCategory}>{comparison.category}</p>
								</div>
							</div>
						))
					)}
				</div>
				<button
					type="button"
					className={`${styles.compareButton} ${myCompany && comparisons.length > 0 ? styles.active : styles.inactive}`}
				>
					기업 비교하기
				</button>
			</div>
		</div>
	);
}

export default MyComparisonPage;
