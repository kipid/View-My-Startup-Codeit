import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import PopUp from '../components/PopUp.jsx';
import { postLogin, postPreSocial, postPwdIter } from '../shared/apis/loginSignupService.js';
import encrypt, { generateRandomHexString } from '../shared/apis/encrypt.js';
import { useSetUser, useUser } from '../context/UserProvider.jsx';
import eyeOnIcon from '../assets/ic_eye_on.png';
import eyeOffIcon from '../assets/ic_eye_off.png';

const EMAIL_REGEX = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+@[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+\.[\w]{2,3}$/;
const PWD_MIN_LENGTH = 6;

function LoginPage() {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [pwd, setPwd] = useState('');
	const [pwdError, setPwdError] = useState('');
	const [pwdVisibility, setPwdVisibility] = useState(false);
	const [validation, setValidation] = useState({ email: false, pwd: false });
	const [error, setError] = useState(null);
	const user = useUser();
	const setUser = useSetUser();

	useEffect(() => {
		if (!email) {
			setEmailError('이메일을 입력해주세요.');
			setValidation(draft => ({ ...draft, email: false }));
		} else if (EMAIL_REGEX.test(email)) {
			setEmailError('');
			setValidation(draft => ({ ...draft, email: true }));
		} else {
			setEmailError('잘못된 이메일 형식입니다.');
			setValidation(draft => ({ ...draft, email: false }));
		}

		if (!pwd) {
			setPwdError('비밀번호를 입력해주세요.');
			setValidation(draft => ({ ...draft, pwd: false }));
		} else if (pwd.length < PWD_MIN_LENGTH) {
			setPwdError(`비밀번호는 ${PWD_MIN_LENGTH}자 이상이어야 합니다.`);
			setValidation(draft => ({ ...draft, pwd: false }));
		} else {
			setPwdError('');
			setValidation(draft => ({ ...draft, pwd: true }));
		}
	}, [email, pwd]);

	const handleLogin = () => {
		if (validation.email && validation.pwd) {
			try {
				postPwdIter({ email })
					.then(async iter => {
						if (iter?.message) {
							setError(iter);
							return;
						}
						const pwdEncrypted = encrypt(iter.salt, pwd, iter.iter);
						setPwd('');
						const result = await postLogin({ email, pwdEncrypted });
						if (result?.message) {
							setError(result);
						} else if (result) {
							setUser(result);
							localStorage.setItem('userUuid', result.userUuid);
							localStorage.setItem('nickname', result.nickname);
							localStorage.setItem('sessionPwd', result.sessionPwd);
							localStorage.setItem('createdAt', result.createdAt);
							return;
						}
						setUser(null);
					})
					.catch(err => setError(err));
			} catch (err) {
				setError(err);
			}
		} else {
			setError({
				message: [
					`입력값이 유효하지 않습니다.`,
					<br key="br0" />,
					`email: ${validation.email ? 'valid' : 'invalid'}`,
					<br key="br1" />,
					`password: ${validation.pwd ? 'valid' : 'invalid'}`,
				],
			});
		}
	};

	return (
		<>
			{user && !error && <Navigate to="/" />}
			<section className={styles.section}>
				<Link to="/">
					<img className={styles.logo} src="/images/site-logo.png" alt="View My StartUp Logo" />
				</Link>
				<p>
					로그인하고 나의 스타트업에
					<br />
					투자를 시작하세요!
				</p>
				<form className={styles.form}>
					<label htmlFor="email">
						이메일
						<input
							id="email"
							name="email"
							placeholder="이메일을 입력해주세요"
							type="email"
							autoComplete="on"
							required
							className={!email || EMAIL_REGEX.test(email) ? styles.alert : ''}
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</label>
					<div id="email-error" className={styles.error}>
						{emailError}
					</div>
					<label htmlFor="password">
						비밀번호
						<div className={styles.pwd_container}>
							<input
								id="password"
								name="password"
								placeholder="비밀번호를 입력해주세요"
								type={pwdVisibility ? 'text' : 'password'}
								required
								value={pwd}
								onKeyDown={e => {
									if (e.key === 'Process') return;
									if (e.code === 'Enter' || e.code === 'NumpadEnter') {
										e.preventDefault();
										handleLogin();
									}
								}}
								onChange={e => setPwd(e.target.value)}
								className={!pwd || pwd.length < PWD_MIN_LENGTH ? styles.alert : ''}
							/>
							<button type="button" onClick={() => setPwdVisibility(!pwdVisibility)}>
								<img src={pwdVisibility ? eyeOnIcon : eyeOffIcon} alt="Button visibility on and off" />
							</button>
						</div>
					</label>
					<div id="pwd-error" className={styles.error}>
						{pwdError}
					</div>
					<button
						id="button-login"
						className={styles.button}
						type="button"
						disabled={!(validation.email && validation.pwd)}
						onClick={handleLogin}
					>
						로그인
					</button>
				</form>
				<div className={styles.oauth}>
					<div className={styles.dividingLine}>또는</div>
					<div className={styles.oauth_images}>
						<button
							type="button"
							onClick={async () => {
								const state = generateRandomHexString();
								let sW;
								let sH;
								if (window.screen.width > window.screen.height) {
									sW = window.screen.width;
									sH = window.screen.height;
								} else {
									sW = window.screen.height;
									sH = window.screen.width;
								}
								const res = await postPreSocial({ nickname: '', state, sW, sH, authorizor: 'google' });
								if (res?.result) {
									window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=917606771008-avkhv20t8tsjs6abvti8b3g3ccqfhouu.apps.googleusercontent.com&redirect_uri=${encodeURIComponent('https://view-my-startup-by-team-1.netlify.app/account/log-in-with-google')}&response_type=token&scope=${encodeURIComponent('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile')}&prompt=consent&state=${state}`;
								} else {
									setError({ message: '서버와의 통신에 문제가 있습니다. 잠시 후 다시 시도해 주세요.' });
								}
							}}
						>
							<img src="/images/oauth-Google.png" alt="구글로 로그인하기" className={styles.img_oauth} />
						</button>
						<button
							type="button"
							onClick={async () => {
								const state = generateRandomHexString();
								let sW;
								let sH;
								if (window.screen.width > window.screen.height) {
									sW = window.screen.width;
									sH = window.screen.height;
								} else {
									sW = window.screen.height;
									sH = window.screen.width;
								}
								const res = await postPreSocial({ nickname: '', state, sW, sH, authorizor: 'kakao' });
								if (res?.result) {
									window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=f04c73ec37a59918252c890afbd3dda0&redirect_uri=${encodeURIComponent('https://view-my-startup-by-team-1.netlify.app/account/log-in-with-kakao')}&response_type=code&scope=account_email&state=${state}`;
								} else {
									setError({ message: '서버와의 통신에 문제가 있습니다. 잠시 후 다시 시도해 주세요.' });
								}
							}}
						>
							<img src="/images/oauth-Kakao.png" alt="카카오로 로그인하기" className={styles.img_oauth} />
						</button>
					</div>
				</div>
				<div className={styles.check_description}>
					<span>아직 View My Startup 회원이 아니신가요?</span>
					<Link to="/signup">
						<span>회원가입</span>
					</Link>
				</div>
			</section>
			<PopUp error={error} popUpText={error?.message} setError={setError} />
		</>
	);
}

export default LoginPage;
