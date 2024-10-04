import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination.jsx';
import style from './CompanyDetailPage.module.css';
import { INVESTMENT } from '../shared/mock/mock.js';

const pageSize = 5;

function CompanyDetailPage() {
	const [list, setList] = useState([]);
	// const [totalCount, setTotalCount] = useState(0);
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(1);
	const [totalAmount, setTotalAmount] = useState(0);

	useEffect(() => {
		const startIdx = pageSize * (pageNum - 1);
		const data = INVESTMENT.slice(startIdx, startIdx + pageSize);
		const count = INVESTMENT.length;
		const total = INVESTMENT.reduce((acc, cur) => {
			return Number(cur.amount) + acc;
		}, 0);

		setList(data);
		// setTotalCount(count);
		setPageNumMax(Math.ceil(count / pageSize) ?? 1);
		setTotalAmount(total);
	}, [pageNum]);

	return (
		<div id={style.companyDetailPage}>
			<div id={style.investments}>
				<div id={style.investmentsHeader}>
					<p>View My Startup에서 받은 투자</p>
					<button type="button">기업투자하기</button>
				</div>

				<div id={style.investmentBody}>
					<table>
						<caption>총 {totalAmount}원</caption>
						<thead>
							<tr>
								<th>투자자 이름</th>
								<th>순위</th>
								<th>투자 금액</th>
								<th>투자 코멘트</th>
							</tr>
						</thead>
						<tbody>
							{list.map((item, idx) => {
								return (
									<tr key={item.id}>
										<td>{item.name}</td>
										<td>{idx + 1 + (pageNum - 1) * pageSize}위</td>
										<td>{item.amount}원</td>
										<td>{item.comment}</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					<Pagination pageNum={pageNum} pageNumMax={pageNumMax} setPageNum={setPageNum} />
				</div>
			</div>
		</div>
	);
}

export default CompanyDetailPage;
