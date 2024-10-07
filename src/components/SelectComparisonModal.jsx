import { useEffect, useState } from 'react';
import Pagination from './Pagination.jsx';
import closeIcon from '../assets/ic_delete.png';
import noLogo from '../assets/no-logo.png';
import checkIcon from '../assets/ic_check.png';
import styles from './SelectModals.module.css';
import { getCompanies } from '../shared/apis/companiesService.js';
import useAsync from '../shared/hooks/useAsync.js';

function CompanySelectList({ item, onSelect, isSelected, isSelectedList }) {
	const handleClick = () => {
		onSelect(item, !isSelected);
	};

	return (
		<div className={styles.companyListWrapper}>
			<div className={styles.companyInfo}>
				<img className={styles.companyLogo} src={item.logo ? item.logo : noLogo} alt={item.id} />
				<p className={styles.companyName}>{item.name}</p>
				<p className={styles.companyCategory}>{item.category}</p>
			</div>
			{isSelectedList ? (
				<button className={styles.cancelSelectButton} onClick={() => onSelect(item, false)} type="button">
					선택 해제
				</button>
			) : (
				<button className={isSelected ? styles.clickedButton : styles.unclickedButton} onClick={handleClick} type="button">
					{isSelected ? (
						<div className={styles.clickedButtonContents}>
							<img src={checkIcon} alt="선택 완료" className={styles.checkIcon} />
							<span>선택완료</span>
						</div>
					) : (
						'선택하기'
					)}
				</button>
			)}
		</div>
	);
}

function SelectComparisonModal({ comparisons, onClose }) {
	const [companies, setCompanies] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(5);
	const [search, setSearch] = useState('');
	const [total, setTotal] = useState();
	const [selectedCompanies, setSelectedCompanies] = useState(comparisons);
	const [errorMessage, setErrorMessage] = useState('');
	const [isPending, errorLoadingCompanies, loadCompaniesAsync, setError] = useAsync(getCompanies);
	const pageSize = 5; // 고정값

	const handleKeyUp = e => {
		const keyword = e.target.value.trim();
		setSearch(keyword);
	};

	const handleSelect = (item, isSelected) => {
		if (isSelected) {
			if (selectTotal < 5) {
				setSelectedCompanies(prev => [...prev, item]);
				setErrorMessage('');
			} else {
				setErrorMessage('*비교할 기업은 최대 5개까지 선택 가능합니다.');
			}
		} else {
			setSelectedCompanies(prev => prev.filter(unselect => unselect.id !== item.id));
			setErrorMessage('');
		}
	};
	const selectTotal = selectedCompanies.length;

	const handleClick = () => {
		onClose(selectedCompanies);
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await loadCompaniesAsync({ skip: (pageNum - 1) * pageSize, take: pageSize, keyword: search });
				if (!result) {
					return;
				}
				setPageNumMax(Math.ceil(result.totalCount / pageSize) ?? 1);
				setTotal(result.totalCount);
				setCompanies(result.list);
			} catch (err) {
				setError(err);
			}
		}
		fetchData();

		return () => {};
	}, [pageNum, pageSize, search, loadCompaniesAsync, setError]);

	return (
		<>
			<div className={styles.modalHead}>
				<p className={styles.modalTitle}>비교할 기업 선택하기</p>
				<img className={styles.closeIcon} src={closeIcon} alt="닫기" onClick={handleClick} />
			</div>
			<input className={styles.searchInput} placeholder="검색어를 입력해 주세요." onChange={handleKeyUp} />
			<p className={styles.modalSubtitle}>선택한 기업 ({selectTotal})</p>
			{selectedCompanies.map(company => (
				<CompanySelectList key={company.id} item={company} onSelect={handleSelect} isSelected isSelectedList />
			))}
			<p className={styles.modalSubtitle}>검색 결과 ({total})</p>
			{companies.map(company => (
				<CompanySelectList
					key={company.id}
					item={company}
					onSelect={handleSelect}
					isSelected={selectedCompanies.some(selects => selects.id === company.id)}
					isSelectedList={false}
				/>
			))}
			{errorMessage && <p className={styles.error}>{errorMessage}</p>}
			<Pagination pageNum={pageNum} setPageNum={setPageNum} pageNumMax={pageNumMax} />
			<div className={styles.blankSpace} />
		</>
	);
}

export default SelectComparisonModal;
