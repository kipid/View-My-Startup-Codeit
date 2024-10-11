import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '../components/Pagination.jsx';
import style from './CompanyDetailPage.module.css';
import noImage from '../assets/no_image.png';
import Modal from '../components/Modal.jsx';
import getScaledNumber from '../shared/utils/getScaledNumber.js';
import InvestmentUpdateModal from '../components/InvestmentUpdateModal.jsx';
import InvestmentDeleteModal from '../components/InvestmentDeleteModal.jsx';
import TouchInvestment from '../components/TouchInvestment.jsx';
import { getInvestments, getInvestmentsTotalAmount } from '../shared/apis/investmentApis.js';
import { getCompanyWithId } from '../shared/apis/companiesService.js';
import InvestmentPostModal from '../components/InvestmentPostModal.jsx';

const pageSize = 5;
const initialBtnControls = {
	isModalOn: false,
	isPost: false,
	isUpdate: false,
	isDelete: false,
};

function CompanyDetailPage() {
	const { companyId } = useParams();
	const [list, setList] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(1);
	const [totalAmount, setTotalAmount] = useState(0);
	const [btnControls, setBtnControls] = useState(initialBtnControls);
	const [modalData, setModalData] = useState({});
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const [companyDetail, setCompanyDetail] = useState(null);

	const handlePost = detail => {
		setBtnControls({ ...initialBtnControls, isModalOn: true, isPost: true });
	};
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
			const company = await getCompanyWithId(companyId);
			const data = await getInvestments({ page: pageNum, pageSize }, companyId);
			const total = await getInvestmentsTotalAmount(companyId);

			setList([...data.list]);
			setPageNumMax(Math.ceil(data.totalCount / pageSize) ?? 1);
			setTotalAmount(total);
			setBtnControls(initialBtnControls);
			setCompanyDetail(company);
		};
		fetchData();
	}, [pageNum, refreshTrigger]);

	return (
		<div id={style.companyDetailPage}>
			{btnControls.isModalOn && (
				<div id={style.modalWrapper}>
					<Modal>
						<InvestmentPostModal
							companyDetail={companyDetail}
							onClose={handleModalClose}
							onPost={() => {
								handleModalClose();
								setRefreshTrigger(prev => prev + 1);
							}}
							show={btnControls.isPost}
						/>
						<InvestmentUpdateModal
							investmentDetail={modalData}
							companyDetail={companyDetail}
							onClose={handleModalClose}
							onUpdate={() => {
								handleModalClose();
								setRefreshTrigger(prev => prev + 1);
							}}
							show={btnControls.isUpdate}
						/>
						<InvestmentDeleteModal
							investmentId={modalData?.id}
							onClose={handleModalClose}
							onDelete={() => {
								handleModalClose();
								setRefreshTrigger(prev => prev + 1);
							}}
							show={btnControls.isDelete}
						/>
					</Modal>
				</div>
			)}

			<div id={style.companyDetail}>
				<div id={style.companyDetailHeader}>
					<div>
						<img src={companyDetail?.logo ?? noImage} alt="companyLogo" />
						<div>
							<p id={style.companyName}>{companyDetail?.name}</p>
							<p id={style.companyCategory}>{companyDetail?.category}</p>
						</div>
					</div>
				</div>

				<div id={style.companyDetailInfo}>
					<div>
						<p>누적 투자 금액</p>
						<p>{getScaledNumber(companyDetail?.accumulInvest)} 원</p>
					</div>
					<div>
						<p>매출액</p>
						<p>{getScaledNumber(companyDetail?.revenue)} 원</p>
					</div>
					<div>
						<p>고용 인원</p>
						<p>{companyDetail?.employees}명</p>
					</div>
				</div>

				<div id={style.companyDetailDesc}>
					<p>기업 소개</p>
					<pre>{companyDetail?.description}</pre>
				</div>
			</div>

			<div id={style.investments}>
				<div id={style.investmentsHeader}>
					<p>View My Startup에서 받은 투자</p>
					<button type="button" onClick={handlePost}>
						기업투자하기
					</button>
				</div>

				<div id={style.investmentBody}>
					<table>
						<caption>총 {getScaledNumber(totalAmount) || 0}원</caption>
						<thead>
							<tr>
								<th>투자자 이름</th>
								<th>순위</th>
								<th>투자 금액</th>
								<th>투자 코멘트</th>
								<th> </th>
							</tr>
						</thead>
						<tbody>
							{list.map((item, idx) => (
								<tr key={item.id || idx}>
									<td>{item.name}</td>
									<td>{idx + 1 + (pageNum - 1) * pageSize}위</td>
									<td>{getScaledNumber(item.amount)}원</td>
									<td>{item.comment}</td>
									<td>
										<TouchInvestment investmentDetail={item} onUpdate={handleUpdate} onDelete={handleDelete} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div>
					<Pagination pageNum={pageNum} pageNumMax={pageNumMax} setPageNum={setPageNum} />
				</div>
			</div>
		</div>
	);
}

export default CompanyDetailPage;
