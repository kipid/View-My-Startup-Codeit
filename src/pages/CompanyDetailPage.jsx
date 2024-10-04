import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination.jsx';
import style from './CompanyDetailPage.module.css';
import noImage from '../assets/no_image.png';
import { COMPANY } from '../shared/mock/mock.js';
import Modal from '../components/Modal.jsx';
import getScaledNumber from '../shared/utils/getScaledNumber.js';
import InvestmentUpdateModal from '../components/InvestmentUpdateModal.jsx';
import InvestmentDeleteModal from '../components/InvestmentDeleteModal.jsx';
import TouchInvestment from '../components/TouchInvestment.jsx';
import { getInvestments, getInvestmentsTotalAmount } from '../shared/apis/investmentApis.js';

const pageSize = 5;
const initialBtnControls = {
	isModalOn: false,
	isUpdate: false,
	isDelete: false,
};

function CompanyDetailPage() {
	const [list, setList] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(1);
	const [totalAmount, setTotalAmount] = useState(0);
	const [btnControls, setBtnControls] = useState(initialBtnControls);
	const [modalData, setModalData] = useState({});
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const handleUpdate = detail => {
		setModalData({ ...detail });
		setBtnControls({ ...initialBtnControls, isModalOn: true, isUpdate: true });
	};
	const handleDelete = detail => {
		setModalData({ ...detail });
		setBtnControls({ ...initialBtnControls, isModalOn: true, isDelete: true });
	};
	const handleModalClose = () => {
		setBtnControls({ ...initialBtnControls });
	};

	useEffect(() => {
		// NOTE useEffect를 async 하지 않고 비동기 처리하기 위한 함수
		const fetchData = async () => {
			const data = await getInvestments({ page: pageNum, pageSize });
			const total = await getInvestmentsTotalAmount();

			setList([...data.list]);
			setPageNumMax(Math.ceil(data.totalCount / pageSize) ?? 1);
			setTotalAmount(total);
			setBtnControls(initialBtnControls);
		};
		fetchData();
	}, [pageNum, refreshTrigger]);
	const companyDetail = COMPANY[1];

	return (
		<div id={style.companyDetailPage}>
			{btnControls.isModalOn && (
				<Modal>
					<InvestmentUpdateModal
						investmentDetail={modalData}
						onClose={handleModalClose}
						onUpdate={() => {
							handleModalClose();
							setRefreshTrigger(prev => prev + 1);
						}}
						show={btnControls.isUpdate}
					/>
					<InvestmentDeleteModal investmentDetail={modalData} onClose={handleModalClose} show={btnControls.isDelete} />
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
						<caption>총 {getScaledNumber(totalAmount)}원</caption>
						<thead>
							<tr>
								<th>투자자 이름</th>
								<th>순위</th>
								<th>투자 금액</th>
								<th>투자 코멘트</th>
							</tr>
						</thead>
						<tbody>
							{list.map((item, idx) => (
								<tr key={item.id || idx}>
									<td>{item.name}</td>
									<td>{idx + 1 + (pageNum - 1) * pageSize}위</td>
									<td>{getScaledNumber(item.amount)}원</td>
									<td>
										<p>{item.comment} </p>
										<TouchInvestment investmentDetail={item} onUpdate={handleUpdate} onDelete={handleDelete} />
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<Pagination pageNum={pageNum} pageNumMax={pageNumMax} setPageNum={setPageNum} />
				</div>
			</div>
		</div>
	);
}

export default CompanyDetailPage;
