import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination.jsx';
import style from './CompanyDetailPage.module.css';
import noImage from '../assets/no_image.png';
import { COMPANY, INVESTMENT } from '../shared/mock/mock.js';
import Modal from '../components/Modal.jsx';
import getScaledNumber from '../shared/utils/getScaledNumber.js';
import InvestmentUpdateModal from '../components/InvestmentUpdateModal.jsx';
import InvestmentDeleteModal from '../components/InvestmentDeleteModal.jsx';
import TouchInvestment from '../components/TouchInvestment.jsx';

const pageSize = 5;

function CompanyDetailPage() {
	const [list, setList] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(1);
	const [totalAmount, setTotalAmount] = useState(0);
	const isModalOn = false;
	const isUpdate = false;
	const isDelete = false;

	useEffect(() => {
		const startIdx = pageSize * (pageNum - 1);
		const data = INVESTMENT.slice(startIdx, startIdx + pageSize);
		const count = INVESTMENT.length;
		const total = INVESTMENT.reduce((acc, cur) => {
			return Number(cur.amount) + acc;
		}, 0);

		setList(data);
		setPageNumMax(Math.ceil(count / pageSize) ?? 1);
		setTotalAmount(total);
	}, [pageNum]);
	const companyDetail = COMPANY[1];

	return (
		<div id={style.companyDetailPage}>
			{isModalOn && (
				<Modal>
					<InvestmentUpdateModal investmentDetail="" show={isUpdate} />
					<InvestmentDeleteModal investmentDetail="" show={isDelete} />
				</Modal>
			)}

			<div id={style.companyDetail}>
				<div id={style.companyDetailHeader}>
					<div>
						<img src={companyDetail.logo ?? noImage} alt="companyLogo" />
						<div>
							<p id={style.companyName}>{companyDetail.name}</p>
							<p id={style.companyCategory}>{companyDetail.category}</p>
						</div>
					</div>
				</div>

				<div id={style.companyDetailInfo}>
					<div>
						<p>누적 투자 금액</p>
						<p>{getScaledNumber(companyDetail.accumulInvest)} 원</p>
					</div>
					<div>
						<p>매출액</p>
						<p>{getScaledNumber(companyDetail.revenue)} 원</p>
					</div>
					<div>
						<p>고용 인원</p>
						<p>{companyDetail.employees}명</p>
					</div>
				</div>

				<div id={style.companyDetailDesc}>
					<p>기업 소개</p>
					<pre>{companyDetail.description}</pre>
				</div>
			</div>

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
										<td>
											<p>{item.comment}</p>
											<TouchInvestment />
										</td>
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
