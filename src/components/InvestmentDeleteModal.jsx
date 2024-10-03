import style from './InvestmentModals.module.css';
import icDelete from '../assets/ic_delete.png';
import noImage from '../assets/no_image.png';

function InvestmentDeleteModal({ companyDetail, show = false }) {
	// NOTE show가 false이면 아무것도 렌더하지 않음
	if (!show) return null;

	return (
		<div id={style.InvestmentDeleteModal}>
			<div id={style.modalHeader}>
				<p>삭제 권한 인증</p>
				<button type="button">
					<img src={icDelete} alt="modalOff" />
				</button>
			</div>

			<form id={style.modalBody}>
				<div id={style.password}>
					<p>비밀번호</p>
					<input type="password" placeholder="비밀번호를 입력해 주세요" />
				</div>
			</form>

			<div id={style.modalFooter}>
				<button type="button" className={style.modal}>
					삭제하기
				</button>
			</div>
		</div>
	);
}

export default InvestmentDeleteModal;
