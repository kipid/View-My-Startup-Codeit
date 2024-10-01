import { useState } from 'react';
import Pagination from '../components/Pagination.jsx';
import style from './CompanyDetailPage.module.css';

function CompanyDetailPage() {
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(1);

	return (
		<div id={style.companyDetailPage}>
			<div id={style.investments}>
				<div id={style.investmentsHeader}>
					<p>View My Startup에서 받은 투자</p>
					<button type="button">기업투자하기</button>
				</div>

				<div id={style.investmentBody}>
					<table>
						<caption>총 X원</caption>
						<thead>
							<tr>
								<th>투자자 이름</th>
								<th>순위</th>
								<th>투자 금액</th>
								<th>투자 코멘트</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>김연우</td>
								<td>1위</td>
								<td>10억</td>
								<td>코드잇은 정말 훌륭한 기업입니다!</td>
							</tr>
							<tr>
								<td>김연우</td>
								<td>1위</td>
								<td>10억</td>
								<td>코드잇은 정말 훌륭한 기업입니다!</td>
							</tr>
							<tr>
								<td>김연우</td>
								<td>1위</td>
								<td>10억</td>
								<td>코드잇은 정말 훌륭한 기업입니다!</td>
							</tr>
							<tr>
								<td>김연우</td>
								<td>1위</td>
								<td>10억</td>
								<td>코드잇은 정말 훌륭한 기업입니다!</td>
							</tr>
							<tr>
								<td>김연우</td>
								<td>1위</td>
								<td>10억</td>
								<td>코드잇은 정말 훌륭한 기업입니다!</td>
							</tr>
						</tbody>
					</table>

					<Pagination pageNum={pageNum} pageNumMax={pageNumMax} setPageNum={setPageNum} />
				</div>
			</div>
		</div>
	);
}

export default CompanyDetailPage;
