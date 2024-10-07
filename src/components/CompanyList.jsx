import getScaledNumber from '../shared/utils/getScaledNumber';
import styles from './CompanyList.module.css';
import noLogo from '../assets/no-logo.png';

function CompanyList({ companies, pageNum, pageSize }) {
	return (
		<div className={styles.tableContainer}>
			<table className={styles.table}>
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
					{companies.map((company, i) => {
						return (
							<tr key={company.id}>
								<td>{i + 1 + pageSize * (pageNum - 1)}위</td>
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
	);
}

export default CompanyList;
