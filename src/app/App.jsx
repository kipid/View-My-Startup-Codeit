import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import GNB from '../components/GNB.jsx';
import styles from './App.module.css';
import { useSetUser } from '../context/UserProvider.jsx';

function App() {
	const setUser = useSetUser();

	useEffect(() => {
		if (localStorage.getItem('userUuid')) {
			setUser({
				userUuid: localStorage.getItem('userUuid'),
				nickname: localStorage.getItem('nickname'),
				sessionPwd: localStorage.getItem('sessionPwd'),
				createdAt: localStorage.getItem('createdAt'),
			});
		}
	}, [setUser]);

	return (
		<>
			<GNB />
			<main className={styles.main}>
				<Outlet />
			</main>
		</>
	);
}

export default App;
