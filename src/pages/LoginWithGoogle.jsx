import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGoogle, postLoginWithGoogle } from '../shared/apis/loginSignupService.js';
import { useSetUser, useUser } from '../context/UserProvider.jsx';
import PopUp from '../components/PopUp.jsx';

function LoginWithGoogle() {
	const [error, setError] = useState(null);
	const user = useUser();
	const setUser = useSetUser();

	useEffect(() => {
		async function loginWithGoogle() {
			let { hash } = window.location;
			if (hash) {
				hash = hash.substring(1);
				const hashVars = hash.split('&');
				const hashMap = {};
				for (const hashVar of hashVars) {
					const keyNValue = hashVar.split('=');
					hashMap[decodeURIComponent(keyNValue[0])] = decodeURIComponent(keyNValue[1]);
				}
				if (hashMap.access_token && hashMap.token_type) {
					const resp = await getGoogle({ access_token: hashMap.access_token, token_type: hashMap.token_type });
					if (resp.verified_email && resp.email) {
						let sW;
						let sH;
						if (window.screen.width > window.screen.height) {
							sW = window.screen.width;
							sH = window.screen.height;
						} else {
							sW = window.screen.height;
							sH = window.screen.width;
						}
						const session = await postLoginWithGoogle({
							sW,
							sH,
							state: hashMap.state,
							email: resp.email,
							authorizor: 'google',
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
		loginWithGoogle();
	});

	return (
		<>
			{user && !error && <Navigate to="/" />}
			<h1>Login with Google</h1>
			<PopUp error={error} popUpText={error?.message} setError={setError} />
		</>
	);
}

export default LoginWithGoogle;
