import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postLoginWithSocial } from '../shared/apis/loginSignupService.js';
import { useSetUser, useUser } from '../context/UserProvider.jsx';
import PopUp from '../components/PopUp.jsx';

function LoginWithKakao() {
	const [error, setError] = useState(null);
	const user = useUser();
	const setUser = useSetUser();

	useEffect(() => {
		async function loginWithKakao() {
			let { search } = window.location;
			if (search) {
				search = search.substring(1);
				const searchVars = search.split('&');
				const searchMap = {};
				for (const searchVar of searchVars) {
					const keyNValue = searchVar.split('=');
					searchMap[decodeURIComponent(keyNValue[0])] = decodeURIComponent(keyNValue[1]);
				}
				const { code, state } = searchMap;
				if (code && state) {
					let sW;
					let sH;
					if (window.screen.width > window.screen.height) {
						sW = window.screen.width;
						sH = window.screen.height;
					} else {
						sW = window.screen.height;
						sH = window.screen.width;
					}
					const session = await postLoginWithSocial({
						sW,
						sH,
						state,
						code,
						authorizor: 'kakao',
					});
					if (session?.message) {
						setError(session);
						return;
					}
					setUser(session);
					return;
				}
				setError({ message: '제대로 된 입력값 (code & state) 이 들어오지 않았습니다.' });
				return;
			}
			setError({ message: '유효한 search 값이 들어오지 않았습니다.' });
		}
		loginWithKakao();
	}, []);

	return (
		<>
			{user && !error && <Navigate to="/" />}
			<h1>Login with Kakao</h1>
			<PopUp error={error} popUpText={error?.message} setError={setError} />
		</>
	);
}

export default LoginWithKakao;
