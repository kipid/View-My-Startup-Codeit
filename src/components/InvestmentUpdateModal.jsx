import style from './InvestmentModals.module.css';
import icDelete from '../assets/ic_delete.png';
import noImage from '../assets/no_image.png';

function InvestmentUpdateModal({ investmentDetail, onClose, show = false }) {
	// NOTE show가 false이면 아무것도 렌더하지 않음
	if (!show) return null;

	const handleClose = () => {};

	const logo = ''; // TODO investmentDetail로부터 coompanyId를 받아서 logo를 가져올것.

	return (
		<div id={style.InvestmentUpdateModal}>
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
						<img src={logo ?? noImage} alt="companyLogo" />
						<p>코드잇</p>
						<p>에듀테크</p>
					</div>
				</div>
				<div id={style.name}>
					<p>투자자 이름</p>
					<input type="text" placeholder="투자자 이름을 입력해 주세요" value={investmentDetail.name} />
				</div>
				<div id={style.amount}>
					<p>투자 금액</p>
					<input type="number" placeholder="투자 금액을 입력해 주세요" value={investmentDetail.amount} />
				</div>
				<div id={style.comment}>
					<p>투자 코멘트</p>
					<textarea placeholder="투자에 대한 코멘트를 입력해 주세요" value={investmentDetail.comment} />
				</div>
				<div id={style.password}>
					<p>비밀번호</p>
					<input type="password" placeholder="비밀번호를 입력해 주세요" />
				</div>
			</form>

			<div id={style.modalFooter}>
				<button type="button" className={`${style.modal} ${style.cancel}`}>
					취소
				</button>
				<button type="button" className={style.modal}>
					투자하기
				</button>
			</div>
		</div>
	);
}

export default InvestmentUpdateModal;
