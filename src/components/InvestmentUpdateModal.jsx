import { useEffect, useState } from 'react';
import style from './InvestmentModals.module.css';
import icDelete from '../assets/ic_delete.png';
import noImage from '../assets/no_image.png';
import eyeOn from '../assets/ic_eye_on.png';
import eyeOff from '../assets/ic_eye_off.png';
import { updateInvestment } from '../shared/apis/investmentApis.js';
import Modal from './Modal.jsx';
import InvestmentCompleteModal from './InvestmentCompleteModal.jsx';

const initialValidation = {
	isAmountOk: false,
	isPasswordOk: false,
	isFirst: true,
};

function InvestmentUpdateModal({ investmentDetail, companyDetail, onClose, onUpdate, show = false }) {
	const [isPWshow, setIsPWshow] = useState(false);
	const [detail, setDetail] = useState(investmentDetail);
	const [pw, setPw] = useState('');
	const [validation, setValidation] = useState(initialValidation);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPwWrong, setIsPwWrong] = useState(false);

	// NOTE show가 false이면 아무것도 렌더하지 않음
	if (!show) return null;

	const togglePWshow = () => {
		setIsPWshow(!isPWshow);
	};
	const validate = () => {
		const newValidation = { ...initialValidation, isFirst: false };

		if (!isNaN(Number(detail.amount)) && detail.amount.length !== 0) newValidation.isAmountOk = true;
		if (pw.length !== 0) newValidation.isPasswordOk = true;

		setValidation(newValidation);

		if (!newValidation.isAmountOk || !newValidation.isPasswordOk) return false;

		return true;
	};

	const handleUpdate = () => {
		setIsPwWrong(false);
		// NOTE validation Check
		if (!validate()) return null;

		const { id } = investmentDetail;

		const updateData = async () => {
			const body = { ...detail, amount: Number(detail.amount), password: pw };
			delete body.createdAt;
			delete body.updatedAt;

			const investment = await updateInvestment(id, body);
			if (investment.status === 401) {
				setIsPwWrong(true);
			} else {
				setIsModalOpen(true);
			}
		};
		updateData();
	};

	return (
		<div id={style.InvestmentUpdateModal}>
			{isModalOpen ? (
				<Modal>
					<InvestmentCompleteModal onClose={() => onUpdate()} show />
				</Modal>
			) : (
				<>
					<div id={style.modalHeader}>
						<p>투자 정보 수정</p>
						<button type="button" onClick={onClose}>
							<img src={icDelete} alt="modalOff" />
						</button>
					</div>

					<form id={style.modalBody}>
						<div id={style.info}>
							<p>투자 기업 정보</p>
							<div>
								<img src={companyDetail.logo ?? noImage} alt="companyLogo" />
								<p>{companyDetail.name}</p>
								<p>{companyDetail.category}</p>
							</div>
						</div>
						<div id={style.name}>
							<label htmlFor="name">투자자 이름</label>
							<input
								id="name"
								type="text"
								placeholder="투자자 이름을 입력해 주세요"
								value={detail.name}
								onChange={e =>
									setDetail(prev => {
										return { ...prev, name: e.target.value };
									})
								}
							/>
						</div>
						<div id={style.amount}>
							<label htmlFor="amount">
								투자 금액{' '}
								{!validation.isFirst && !validation.isAmountOk && <span className={style.errorMsg}>숫자로 입력해주세요.</span>}
							</label>
							<input
								id="amount"
								type="number"
								placeholder="투자 금액을 입력해 주세요"
								value={detail.amount}
								onChange={e =>
									setDetail(prev => {
										return { ...prev, amount: e.target.value };
									})
								}
							/>
						</div>
						<div id={style.comment}>
							<label htmlFor="comment">투자 코멘트</label>
							<textarea
								id="comment"
								placeholder="투자에 대한 코멘트를 입력해 주세요"
								value={detail.comment}
								onChange={e =>
									setDetail(prev => {
										return { ...prev, comment: e.target.value };
									})
								}
							/>
						</div>
						<div id={style.password}>
							<label htmlFor="password">
								비밀번호{' '}
								{!validation.isFirst && !validation.isPasswordOk && (
									<span className={style.errorMsg}>비밀번호를 입력해주세요.</span>
								)}
								{isPwWrong && <span className={style.errorMsg}>비밀번호가 일치하지 않습니다.</span>}
							</label>
							<input
								id="password"
								type={isPWshow ? '' : 'password'}
								placeholder="비밀번호를 입력해 주세요"
								value={pw}
								onChange={e => {
									setPw(e.target.value);
								}}
							/>
							<img id={style.eye} src={isPWshow ? eyeOn : eyeOff} alt="비밀번호 표시" onClick={togglePWshow} />
						</div>
					</form>

					<div id={style.modalFooter}>
						<button type="button" className={`${style.modal} ${style.cancel}`} onClick={onClose}>
							취소
						</button>
						<button type="button" className={style.modal} onClick={handleUpdate}>
							수정하기
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default InvestmentUpdateModal;
