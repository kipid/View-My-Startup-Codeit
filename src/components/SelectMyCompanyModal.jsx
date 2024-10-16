import { useEffect, useState } from 'react';
import Pagination from './Pagination.jsx';
import closeIcon from '../assets/ic_delete.png';
import noLogo from '../assets/no-logo.png';
import checkIcon from '../assets/ic_check.png';
import styles from './SelectModals.module.css';
import useAsync from '../shared/hooks/useAsync.js';
import { getCompanies } from '../shared/apis/companiesService.js';

function CompanySelectList({ item, onSelect, isSelected }) {
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
		</div>
	);
}

function SelectMyCompanyModal({ onClose }) {
	const [companies, setCompanies] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(5);
	const [search, setSearch] = useState('');
	const [total, setTotal] = useState();
	const [selectedCompany, setSelectedCompany] = useState('');
	const [selectHistory, setSelectHistory] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [isPending, errorLoadingCompanies, loadCompaniesAsync, setError] = useAsync(getCompanies);
	const pageSize = 5; // 고정값

	const handleKeyUp = e => {
		const keyword = e.target.value.trim();
		setPageNum(1);
		setSearch(keyword);
	};

	const handleSelect = (item, isSelected) => {
		if (isSelected) {
			if (selectedCompany) {
				setErrorMessage('*나의 기업은 1개만 선택 가능합니다.');
			} else {
				setSelectedCompany(item);
				setSelectHistory(prev => {
					if (prev.length < 5 && !prev.some(object => object.id === item.id)) {
						return [item, ...prev];
					}
					if (!prev.some(object => object.id === item.id)) {
						return [item, ...prev.slice(0, 4)];
					}
					return prev;
				});
				setErrorMessage('');
			}
		} else {
			setSelectedCompany('');
			setErrorMessage('');
		}
	};
	const historyTotal = selectHistory.length;

	const handleClick = () => {
		onClose(selectedCompany);
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
				<p className={styles.modalTitle}>나의 기업 선택하기</p>
				<img className={styles.closeIcon} src={closeIcon} alt="닫기" onClick={handleClick} />
			</div>
			<input className={styles.searchInput} placeholder="검색어를 입력해 주세요." onChange={handleKeyUp} />

			<p className={styles.modalSubtitle}>최근 선택한 기업 ({historyTotal})</p>
			{selectHistory.map(company => (
				<CompanySelectList
					key={company.id}
					item={company}
					onSelect={handleSelect}
					isSelected={company.id === selectedCompany.id}
				/>
			))}

			<p className={styles.modalSubtitle}>검색 결과 ({total})</p>
			{companies.map(company => (
				<CompanySelectList
					key={company.id}
					item={company}
					onSelect={handleSelect}
					isSelected={company.id === selectedCompany.id}
				/>
			))}
			{errorMessage && <p className={styles.error}>{errorMessage}</p>}

			<Pagination pageNum={pageNum} setPageNum={setPageNum} pageNumMax={pageNumMax} />
			<div className={styles.blankSpace} />
		</>
	);
}

export default SelectMyCompanyModal;
