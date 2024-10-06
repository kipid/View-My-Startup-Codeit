import { useCallback, useEffect, useState } from 'react';
import styles from './CompanyListPage.module.css';
import Pagination from '../components/Pagination.jsx';
import { getCompanies } from '../shared/apis/companiesService.js';
import useAsync from '../shared/hooks/useAsync.js';
import PopUp from '../components/PopUp.jsx';

function CompanyListPage() {
	const [keyword, setKeyword] = useState('');
	const [sort, setSort] = useState('recent');
	const [companies, setCompanies] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [isPending, errorLoadingCompanies, loadCompaniesAsync, setError] = useAsync(getCompanies);

	const onSearch = useCallback(
		async keyw => {
			try {
				setPageNum(1);
				const result = await loadCompaniesAsync({ skip: 0, take: pageSize, sort, keyword: keyw });
				if (!result) {
					return;
				}
				setPageNumMax(Math.ceil(result.totalCount / pageSize) ?? 1);
				setCompanies(result.list);
			} catch (err) {
				setError(err);
			}
		},
		[pageSize, sort, loadCompaniesAsync, setError],
	);

	const handleSearch = useCallback(
		async (e, keyw) => {
			if (isPending || e.key === 'Process') return;
			if (e.code === 'Enter') {
				e.preventDefault();
				onSearch(keyw);
			}
		},
		[isPending, onSearch],
	);

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await loadCompaniesAsync({ skip: (pageNum - 1) * pageSize, take: pageSize, sort, keyword });
				if (!result) {
					return;
				}
				setPageNumMax(Math.ceil(result.totalCount / pageSize) ?? 1);
				setCompanies(result.list);
			} catch (err) {
				setError(err);
			}
		}
		fetchData();

		return () => {};
	}, [pageNum, pageSize, sort, loadCompaniesAsync, setError]);

	return (
		<>
			<div className={styles.heads}>
				<h2>전체 스타트업 목록</h2>
				<div className={styles.keywordAndSortOptions}>
					<div className={styles.keywordInputContainer}>
						<input
							name="keyword"
							value={keyword}
							onChange={e => setKeyword(e.target.value)}
							placeholder="검색어를 입력해주세요"
							onKeyDown={e => {
								handleSearch(e, keyword);
							}}
						/>
						<button type="button" onClick={() => onSearch(keyword)}>
							<img src="/images/ic_search.png" alt="Search" />
						</button>
					</div>
					<select value={sort} onChange={e => setSort(e.target.value)}>
						<option value="recent">최신순</option>
						<option value="accumulInvestDesc">누적 투자금액 높은순</option>
						<option value="accumulInvestAsc">누적 투자금액 낮은순</option>
						<option value="earningDesc">매출액 높은순</option>
						<option value="earningAsc">매출액 낮은순</option>
						<option value="employeeDesc">고용 인원 많은순</option>
						<option value="employeeAsc">고용 인원 적은순</option>
					</select>
				</div>
			</div>
			{/* <CompanyList companies={companies} /> */}
			<Pagination pageNum={pageNum} pageNumMax={pageNumMax} setPageNum={setPageNum} />
			<PopUp error={errorLoadingCompanies} popUpText={errorLoadingCompanies?.message} setError={setError} />
		</>
	);
}

export default CompanyListPage;
