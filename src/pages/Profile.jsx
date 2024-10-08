import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './LoginPage.module.css';
import { useSetUser, useUser } from '../context/UserProvider.jsx';
import { postLogout, postSsnAndCallback, getSsns, postLogoutFromAll } from '../shared/apis/loginSignupService.js';
import PopUp from '../components/PopUp.jsx';

function Profile() {
	const [sessions, setSessions] = useState([]);
	const [error, setError] = useState(null);
	const user = useUser();
	const setUser = useSetUser();

	return (
		<>
			{!user && !error && <Navigate to="/login" />}
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
					<button
						className={styles.getSsns}
						type="button"
						onClick={() => {
							postSsnAndCallback({ userId: user.userUuid, createdAt: user.createdAt, sessionPwd: user.sessionPwd }, async () => {
								const ssns = await getSsns();
								console.log('ssns', ssns); // TODO del
								setSessions(ssns);
							});
						}}
					>
						모든 Session 불러오기
					</button>
					<table className={styles.table}>
						<tbody>
							<tr>
								<th>IP</th>
								<th>Iteration</th>
								<th>created at</th>
							</tr>
							{sessions.map(session => {
								return (
									<tr key={session.createdAt}>
										<td>{session.ip}</td>
										<td>{session.iter}</td>
										<td>{new Date(session.createdAt).toLocaleString()}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
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
						postSsnAndCallback({ userId: user.userUuid, createdAt: user.createdAt, sessionPwd: user.sessionPwd }, async () => {
							const result = await postLogout({ userId: user.userUuid, createdAt: user.createdAt });
							setError(result);
						});
					}}
				>
					로그아웃
				</button>
				<button
					className={styles.logout}
					type="button"
					onClick={() => {
						localStorage.clear();
						setUser(null);
						postSsnAndCallback({ userId: user.userUuid, createdAt: user.createdAt, sessionPwd: user.sessionPwd }, async () => {
							const result = await postLogoutFromAll({ userId: user.userUuid });
							setError(result);
						});
					}}
				>
					모든 곳으로부터 로그아웃
				</button>
				<PopUp error={error} setError={setError} popUpText={error?.message} />
			</section>
		</>
	);
}

export default Profile;
