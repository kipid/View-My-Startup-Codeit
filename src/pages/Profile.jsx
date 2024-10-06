import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './LoginPage.module.css';
import { useSetUser, useUser } from '../context/UserProvider.jsx';
import { postLogout, postSsnIter } from '../shared/apis/loginSignupService.js';
import encrypt from '../shared/apis/encrypt.js';
import PopUp from '../components/PopUp.jsx';

function Profile() {
	const [error, setError] = useState(null);
	const user = useUser();
	const setUser = useSetUser();

	return (
		<>
			{!user && <Navigate to="/login" />}
			<section className={styles.section}>
				<Link to="/">
					<img className={styles.logo} src="/images/site-logo.png" alt="View My StartUp Logo" />
				</Link>
				<div className={styles.profileElements}>
					<div className={styles.profileElement}>
						<h3>Uuid</h3>
						<p>{user?.userUuid}</p>
					</div>
					<div className={styles.profileElement}>
						<h3>닉네임</h3>
						<p>{user?.nickname}</p>
					</div>
					<div className={styles.profileElement}>
						<h3>로그인 시간</h3>
						<p>{user?.createdAt}</p>
					</div>
				</div>
				<button
					className={styles.logout}
					type="button"
					onClick={() => {
						localStorage.clear();
						setUser(null);
						postSsnIter({ userId: user.userUuid, createdAt: user.createdAt }).then(async iter => {
							console.log('user', user);
							console.log('iter', iter);
							const sessionEncrypted = encrypt(iter.sessionSalt, user.sessionPwd, iter.iter);
							const result = await postLogout({ userId: user.userUuid, createdAt: user.createdAt, sessionEncrypted });
							console.log('result', result);
							setError(result);
						});
					}}
				>
					로그아웃
				</button>
				<PopUp error={error} setError={setError} popUpText={error?.message} />
			</section>
		</>
	);
}

export default Profile;
