import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import PopUp from '../components/PopUp.jsx';
import { postCheck, postPreSocial, postSignup } from '../shared/apis/loginSignupService.js';
import encrypt, { generateRandomHexString, ITER_FULL } from '../shared/apis/encrypt.js';
import { useSetUser, useUser } from '../context/UserProvider';

const EMAIL_REGEX = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+@[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+\.[\w]{2,3}$/;
const PWD_MIN_LENGTH = 6;
const NAME_REGEX = /^[\w\-_.ㄱ-ㅎㅏ-ㅣ가-힣\s]+$/;
const NICKNAME_REGEX = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]*$/;

function SignupPage() {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState('');
	const [nickname, setNickname] = useState('');
	const [nicknameError, setNicknameError] = useState('');
	const [pwd, setPwd] = useState('');
	const [pwdError, setPwdError] = useState('');
	const [pwdCfm, setPwdCfm] = useState('');
	const [pwdCfmError, setPwdCfmError] = useState('');
	const [pwdVisibility, setPwdVisibility] = useState(false);
	const [pwdCfmVisibility, setPwdCfmVisibility] = useState(false);
	const [validation, setValidation] = useState({ email: false, name: false, nickname: false, pwd: false, pwdCfm: false });
	const [nicknameForSocial, setNicknameForSocial] = useState('');
	const [nicknameForSocialError, setNicknameForSocialError] = useState('');
	const [validationSocial, setValidationSocial] = useState(false);
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

		if (!name) {
			setNameError('이름을 입력해주세요.');
			setValidation(draft => ({ ...draft, name: false }));
		} else if (NAME_REGEX.test(name)) {
			setNameError('');
			setValidation(draft => ({ ...draft, name: true }));
		} else {
			setNameError('잘못된 이름 형식입니다.');
			setValidation(draft => ({ ...draft, name: false }));
		}

		if (!nickname) {
			setNicknameError('닉네임을 입력해주세요.');
			setValidation(draft => ({ ...draft, nickname: false }));
		} else if (NICKNAME_REGEX.test(nickname)) {
			setNicknameError('');
			setValidation(draft => ({ ...draft, nickname: true }));
		} else if (nickname.length > 20) {
			setNicknameError('닉네임은 20자 이하여야 합니다.');
			setValidation(draft => ({ ...draft, nickname: false }));
		} else {
			setNicknameError('잘못된 닉네임 형식입니다.');
			setValidation(draft => ({ ...draft, nickname: false }));
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

		if (!pwdCfm) {
			setPwdCfmError('위의 비밀번호를 다시 한번 더 입력해주세요.');
			setValidation(draft => ({ ...draft, pwdCfm: false }));
		} else if (pwdCfm !== pwd) {
			setPwdCfmError('비밀번호가 일치하지 않습니다.');
			setValidation(draft => ({ ...draft, pwdCfm: false }));
		} else {
			setPwdCfmError('');
			setValidation(draft => ({ ...draft, pwdCfm: true }));
		}
	}, [email, name, nickname, pwd, pwdCfm]);

	useEffect(() => {
		if (!nicknameForSocial) {
			setNicknameForSocialError('닉네임을 입력해주세요.');
			setValidationSocial(draft => false);
		} else if (NICKNAME_REGEX.test(nicknameForSocial)) {
			setNicknameForSocialError('');
			setValidationSocial(draft => true);
		} else if (nicknameForSocial.length > 20) {
			setNicknameForSocialError('닉네임은 20자 이하여야 합니다.');
			setValidationSocial(draft => false);
		} else {
			setNicknameForSocialError('잘못된 닉네임 형식입니다.');
			setValidationSocial(draft => false);
		}
	}, [nicknameForSocial]);

	const handleSignup = async () => {
		if (validation.email && validation.nickname && validation.pwd && validation.pwdCfm) {
			try {
				const check = await postCheck({ email, nickname });
				if (!(check.email && check.nickname)) {
					setError({
						message: [
							!check.email ? `Email ${email} 은 이미 등록되어 있습니다.` : '',
							<br key="br0" />,
							!check.nickname ? `닉네임 ${nickname} 은 이미 사용 중 입니다.` : '',
						],
					});
					return;
				}
				const salt = generateRandomHexString();
				const pwdEncrypted = encrypt(salt, pwd, ITER_FULL);
				setPwd('');
				setPwdCfm('confirmed');
				const result = await postSignup({ email, name, nickname, salt, pwdEncrypted });
				if (result?.userUuid) {
					setUser(result);
					localStorage.setItem('userUuid', result.userUuid);
					localStorage.setItem('nickname', result.nickname);
					localStorage.setItem('sessionPwd', result.sessionPwd);
					localStorage.setItem('createdAt', result.createdAt);
					return;
				}
				setUser(null);
				setError({ message: '계정 생성에 실패했습니다. 다시 시도해 주세요.' });
			} catch (err) {
				setError(err);
			}
		} else {
			setError({
				message: `입력값이 유효하지 않습니다.\nemail: ${validation.email ? 'valid' : 'invalid'}\nname: ${validation.name ? 'valid' : 'invalid'}\nnickname: ${validation.nickname ? 'valid' : 'invalid'}\npassword: ${validation.pwd ? 'valid' : 'invalid'}\npassword confirm: ${validation.pwdCfm ? 'valid' : 'invalid'}`,
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
							className={!email || !EMAIL_REGEX.test(email) ? styles.alert : ''}
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</label>
					<div id="email-error" className={styles.error}>
						{emailError}
					</div>
					<label htmlFor="name">
						이름
						<input
							id="name"
							name="name"
							placeholder="이름을 입력해주세요"
							type="text"
							autoComplete="on"
							required
							className={!name || !NAME_REGEX.test(name) ? styles.alert : ''}
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</label>
					<div id="name-error" className={styles.error}>
						{nameError}
					</div>
					<label htmlFor="nickname">
						닉네임
						<input
							id="nickname"
							name="nickname"
							placeholder="닉네임을 입력해주세요"
							type="text"
							autoComplete="on"
							required
							className={!nickname || !NICKNAME_REGEX.test(nickname) ? styles.alert : ''}
							value={nickname}
							onChange={e => setNickname(e.target.value)}
						/>
					</label>
					<div id="nickname-error" className={styles.error}>
						{nicknameError}
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
								className={!pwd || pwd.length < PWD_MIN_LENGTH ? styles.alert : ''}
								value={pwd}
								onChange={e => setPwd(e.target.value)}
							/>
							<button type="button" onClick={() => setPwdVisibility(!pwdVisibility)}>
								<img src="/images/btn_visibility_off_24px.svg" alt="Button visibility off" />
							</button>
						</div>
					</label>
					<div id="pwd-error" className={styles.error}>
						{pwdError}
					</div>
					<label htmlFor="password-confirm">
						비밀번호 확인
						<div className={styles.pwd_container}>
							<input
								id="password-confirm"
								name="password-confirm"
								placeholder="비밀번호를 다시 한 번 입력해주세요"
								type={pwdCfmVisibility ? 'text' : 'password'}
								required
								className={!pwdCfm || pwdCfm !== pwd ? styles.alert : ''}
								value={pwdCfm}
								onKeyDown={e => {
									if (e.key === 'Process') return;
									if (e.code === 'Enter' || e.code === 'NumpadEnter') {
										e.preventDefault();
										handleSignup();
									}
								}}
								onChange={e => setPwdCfm(e.target.value)}
							/>
							<button type="button" onClick={() => setPwdCfmVisibility(!pwdCfmVisibility)}>
								<img src="/images/btn_visibility_off_24px.svg" alt="Button visibility off" />
							</button>
						</div>
					</label>
					<div id="pwd-cfm-error" className={styles.error}>
						{pwdCfmError}
					</div>
					<button
						id="button-signup"
						className={styles.button}
						type="button"
						disabled={!(validation.email && validation.nickname && validation.pwd && validation.pwdCfm)}
						onClick={handleSignup}
					>
						회원가입
					</button>
				</form>
				<div className={styles.oauth}>
					<span>간편 가입하기</span>
					<div className={styles.form}>
						<label htmlFor="nicknameForSocial">
							닉네임
							<input
								id="nicknameForSocial"
								name="nicknameForSocial"
								placeholder="닉네임을 입력해주세요"
								type="text"
								autoComplete="on"
								required
								className={!nicknameForSocial || !NICKNAME_REGEX.test(nicknameForSocial) ? styles.alert : ''}
								value={nicknameForSocial}
								onChange={e => setNicknameForSocial(e.target.value)}
							/>
						</label>
						<div id="nicknameForSocial-error" className={styles.error}>
							{nicknameForSocialError}
						</div>
					</div>
					<div className={styles.oauth_images}>
						<button
							className={validationSocial ? '' : styles.disabledButton}
							type="button"
							onClick={async () => {
								if (!validationSocial) {
									setError({ message: '닉네임이 유효하지 않습니다.' });
									return;
								}
								const nicknameAvailable = await postCheck({ nickname: nicknameForSocial });
								if (!nicknameAvailable.nickname) {
									setError(`닉네임 ${nicknameForSocial} 은 이미 사용 중 입니다.`);
									return;
								}
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
								const res = await postPreSocial({ nickname: nicknameForSocial, state, sW, sH, authorizor: 'google' });
								if (res?.result) {
									window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=917606771008-avkhv20t8tsjs6abvti8b3g3ccqfhouu.apps.googleusercontent.com&redirect_uri=${encodeURIComponent('https://view-my-startup-by-team-1.netlify.app/account/log-in-with-google')}&response_type=token&scope=${encodeURIComponent('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile')}&prompt=consent&state=${state}`;
								} else {
									setError({ message: '서버와의 통신에 문제가 있습니다. 잠시 후 다시 시도해 주세요.' });
								}
							}}
						>
							<img src="/images/oauth-Google.png" alt="구글로 가입하기" className={styles.img_oauth} />
						</button>
						<button
							className={validationSocial ? '' : styles.disabledButton}
							type="button"
							onClick={async () => {
								if (!validationSocial) {
									setError({ message: '닉네임이 유효하지 않습니다.' });
									return;
								}
								const nicknameAvailable = await postCheck({ nickname: nicknameForSocial });
								if (!nicknameAvailable.nickname) {
									setError(`닉네임 ${nicknameForSocial} 은 이미 사용 중 입니다.`);
									return;
								}
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
								const res = await postPreSocial({ nickname: nicknameForSocial, state, sW, sH, authorizor: 'kakao' });
								if (res?.result) {
									window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=f04c73ec37a59918252c890afbd3dda0&redirect_uri=${encodeURIComponent('https://view-my-startup-by-team-1.netlify.app/account/log-in-with-kakao')}&response_type=code&scope=account_email&state=${state}`;
								} else {
									setError({ message: '서버와의 통신에 문제가 있습니다. 잠시 후 다시 시도해 주세요.' });
								}
							}}
						>
							<img src="/images/oauth-Kakao.png" alt="카카오로 가입하기" className={styles.img_oauth} />
						</button>
					</div>
				</div>
				<div className={styles.check_description}>
					이미 회원이신가요? <Link to="/login">로그인</Link>
				</div>
			</section>
			<PopUp error={error} popUpText={error?.message} setError={setError} />
		</>
	);
}

export default SignupPage;
