import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postKakao, postLoginWithKakao } from '../shared/apis/loginSignupService.js';
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
				if (searchMap.code && searchMap.state) {
					const resp = await postKakao({
						grant_type: 'authorization_code',
						client_id: 'f04c73ec37a59918252c890afbd3dda0',
						redirect_uri: 'https://view-my-startup-by-team-1.netlify.app/account/log-in-with-kakao',
						code: searchMap.code,
						client_secret: 'HB9bLmA11ubEUjbJddanmFMoe6dglyt8',
					});
					console.log('resp', resp);
					if (resp.email) {
						let sW;
						let sH;
						if (window.screen.width > window.screen.height) {
							sW = window.screen.width;
							sH = window.screen.height;
						} else {
							sW = window.screen.height;
							sH = window.screen.width;
						}
						const session = await postLoginWithKakao({
							sW,
							sH,
							state: searchMap.state,
							email: resp.email,
							authorizor: 'kakao',
						});
						if (session?.message) {
							setError(session);
							return;
						}
						setUser(session);
					}
				}
			}
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
