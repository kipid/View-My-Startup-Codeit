import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import { getCompanies } from '../shared/apis/companiesService';
import noLogo from '../assets/no-logo.png';

function LandingPage() {
	const [popularCompanies, setPopularCompanies] = useState([]);
	const [sort, setSort] = useState('watcherDesc'); // 정렬 기준 상태 추가

	// 상위 기업 가져오기
	useEffect(() => {
		const fetchTopCompanies = async () => {
			try {
				const companiesData = await getCompanies({ skip: 0, take: 1000, keyword: '', include: 'watcherAndComparison' });
				setPopularCompanies(companiesData.list);
			} catch (error) {
				console.error('Error fetching companies:', error);
			}
		};
		fetchTopCompanies();
	}, []);

	// 정렬 후 상위 3개 자르기
	const getTop3Companies = companies => {
		const sortedCompanies = [...companies];
		switch (sort) {
			case 'watcherDesc':
				sortedCompanies.sort((a, b) => b._count.watcherList - a._count.watcherList);
				break;
			case 'comparisonDesc':
				sortedCompanies.sort((a, b) => b._count.comparisons - a._count.comparisons);
				break;
			default:
				break;
		}
		return sortedCompanies.slice(0, 3); // 상위 3개 잘라서 반환
	};

	const handleSortChange = e => {
		setSort(e.target.value);
	};

	// 글자수 제한 함수 추가 (최대 100자)
	const truncateDescription = (text, maxLength) => {
		if (text.length <= maxLength) {
			return text;
		}
		return `${text.slice(0, maxLength)} ...`; // 글자 수 제한 후 '...' 추가
	};

	return (
		<div className={style.landingPage}>
			{/* 히어로 섹션 */}
			<section className={style.heroSection}>
				<div className={style.heroText}>
					<h1>
						스타트업 정보를 확인하고,
						<br /> 투자 해보세요!
					</h1>
				</div>
				<div className={style.heroContent}>
					<h2>
						수많은 기업들을 쉽고 간편하게 비교하고, 다양한 투자 기회를 한곳에서 체계적으로 관리할 수 있는 플랫폼.
						<br />
						전문적인 데이터 분석과 시장 정보를 제공하여, 투자 결정을 더욱 스마트하게.
						<br />
						이곳에서 모든 것을 간편하게 경험해보세요.
					</h2>
				</div>
			</section>

			<section className={style.featuresSection}>
				<div className={style.featureHeader}>
					<div className={style.featuresTitle}>
						<h1>인기 기업 TOP 3</h1>
					</div>

					{/* 정렬 기준 선택 드롭다운 추가 */}
					<select className={style.sortDropdown} value={sort} onChange={handleSortChange}>
						<option value="watcherDesc">나의 기업 선택 높은순</option>
						<option value="comparisonDesc">비교 기업 선택 높은순</option>
					</select>
				</div>

				<div className={style.popularCompanies}>
					{getTop3Companies(popularCompanies).map((company, index) => (
						<Link to={`/companies/${company.id}`} key={company.id} className={style.companyLink}>
							<div key={company.id} className={style.companyCard}>
								<div className={style.companyInfoContent}>
									<p className={style.companyRank}>{index + 1}위</p>
									<div className={style.companyInfo}>
										{/* 회사 로고와 이름 */}
										<img src={company.logo ? company.logo : noLogo} alt={`${company.name} logo`} className={style.companyLogo} />
										<h3 className={style.companyName}>{company.name}</h3>
									</div>
									<p className={style.companyDescription}>
										{/* 글자 수 제한된 description */}
										{truncateDescription(company.description, 200)}
									</p>
								</div>
								<div className={style.companyInfoFooter}>
									<p className={style.categoryText}>카테고리: {company.category}</p>
									<p className={style.countText}>나의 기업 선택 횟수: {company._count.watcherList}</p>
									<p className={style.countText}>비교 기업 선택 횟수: {company._count.comparisons}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>
		</div>
	);
}

export default LandingPage;
