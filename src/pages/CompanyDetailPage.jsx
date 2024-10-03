import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination.jsx';
import style from './CompanyDetailPage.module.css';
import noImage from '../assets/no_image.png';
import { COMPANY, INVESTMENT } from '../shared/mock/mock.js';
import Modal from '../components/Modal.jsx';
import icDelete from '../assets/ic_delete.png';
import getScaledNumber from '../shared/utils/getScaledNumber.js';

const pageSize = 5;

function InvestmentUpdateModal({ companyDetail, show = false }) {
	return (
		<div id={style.InvestmentUpdateModal}>
			<div id={style.modalHeader}>
				<p>투자 정보 수정</p>
				<button type="button">
					<img src={icDelete} alt="modalOff" />
				</button>
			</div>

			<form id={style.modalBody}>
				<div id={style.info}>
					<p>투자 기업 정보</p>
					<div>
						<img src={companyDetail.logo ?? noImage} alt="companyLogo" />
						<p>코드잇</p>
						<p>에듀테크</p>
					</div>
				</div>
				<div id="name">
					<p>투자자 이름</p>
					<input type="text" placeholder="투자자 이름을 입력해 주세요" />
				</div>
				<div id="amount">
					<p>투자 금액</p>
					<input type="text" placeholder="투자 금액을 입력해 주세요" />
				</div>
				<div id={style.comment}>
					<p>투자 코멘트</p>
					<textarea placeholder="투자에 대한 코멘트를 입력해 주세요" />
				</div>
				<div id="password">
					<p>비밀번호</p>
					<input type="password" placeholder="비밀번호를 입력해 주세요" />
				</div>
				<div id="passwordCheck">
					<p>비밀번호 확인</p>
					<input type="password" placeholder="비밀번호를 다시 한 번 입력해 주세요" />
				</div>
			</form>

			<div
				id="modalFooter"
				style={{ padding: '0 27.5px', display: 'flex', justifyContent: 'space-between', gap: 16, height: 48 }}
			>
				<button
					type="button"
					style={{
						width: 183,
						borderRadius: 50,
						padding: '13px 48px',
						backgroundColor: 'inherit',
						border: '1px solid #eb5230',
						color: '#eb5230',
						fontSize: 18,
						fontWeight: 600,
						textAlign: 'center',
					}}
				>
					취소
				</button>
				<button
					type="button"
					style={{
						width: 183,
						borderRadius: 50,
						padding: '13px 48px',
						backgroundColor: '#eb5230',
						border: '1px solid #eb5230',
						color: 'white',
						fontSize: 18,
						fontWeight: 600,
						textAlign: 'center',
					}}
				>
					투자하기
				</button>
			</div>
		</div>
	);
}

function CompanyDetailPage() {
	const [list, setList] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(1);
	const [totalAmount, setTotalAmount] = useState(0);
	const isModalOn = true;
	const isUpdate = true;

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
					<InvestmentUpdateModal companyDetail={companyDetail} show={isUpdate} />
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
