import styles from './PopUp.module.css';

function PopUp({ error, popUpText, setError }) {
	return (
		<div className={[styles.popUpWrapper, error ? '' : 'none'].join(' ')}>
			<div className={styles.popUpContainer}>
				<div className={styles.popUpText}>{popUpText}</div>
				<button
<<<<<<< HEAD
					className={styles.popUpCloseButton}
					type="button"
=======
					type="button"
					className={styles.popUpCloseButton}
>>>>>>> dev
					onClick={() => {
						setError(null);
					}}
				>
					닫기
				</button>
			</div>
		</div>
	);
}

export default PopUp;
