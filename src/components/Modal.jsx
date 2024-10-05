import styles from './Modal.module.css';

function Modal({ children }) {
	return (
		<div id={styles.modalContainer} onScroll={e => e.stopPropagation()}>
			<div id={styles.modalWrapper}>
				<div id={styles.modalContents}>{children}</div>
			</div>
		</div>
	);
}

export default Modal;
