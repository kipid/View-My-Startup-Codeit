import { useEffect } from 'react';
import { getGoogle, postLoginWithGoogle } from '../shared/apis/loginSignupService';

function LoginWithGoogle() {
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
						if (window.screenWidth > window.screenHeight) {
							sW = window.screenWidth;
							sH = window.screenHeight;
						} else {
							sW = window.screenHeight;
							sH = window.screenWidth;
						}
						const session = await postLoginWithGoogle({
							sW,
							sH,
							state: hashMap.state.val,
							email: resp.email,
						});
					}
				}
			}
		}
		loginWithGoogle();
	});

	return <h1>Login with Google</h1>;
}

export default LoginWithGoogle;
