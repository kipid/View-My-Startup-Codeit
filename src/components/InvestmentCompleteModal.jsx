import styles from './InvestmentModals.module.css';
import icDelete from '../assets/ic_delete.png';

function InvestmentCompleteModal({ onClose, show = false }) {
	if (!show) return null;

	return (
		<div id={styles.InvestmentCompleteModal}>
			<div>
				<button type="button" onClick={onClose}>
					<img src={icDelete} alt="modalOff" />
				</button>
			</div>
			<div>
				<p>완료되었습니다!</p>
				<button type="button" className={styles.modal} onClick={onClose}>
					확인
				</button>
			</div>
		</div>
	);
}

export default InvestmentCompleteModal;
