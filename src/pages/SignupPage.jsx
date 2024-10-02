import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';
import PopUp from '../components/PopUp.jsx';
import { postSignup } from '../apis/loginSignupService.js';
import encrypt, { generateRandomHexString, ITER_FULL } from '../apis/encrypt.js';
import { useSetUser } from '../context/UserProvider';

const EMAIL_REGEX = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+@[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+\.[\w]{2,3}$/;
const PWD_MIN_LENGTH = 6;
const NICKNAME_REGEX = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]*$/;

function SignupPage() {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [nickname, setNickname] = useState('');
	const [nicknameError, setNicknameError] = useState('');
	const [pwd, setPwd] = useState('');
	const [pwdError, setPwdError] = useState('');
	const [pwdCfm, setPwdCfm] = useState('');
	const [pwdCfmError, setPwdCfmError] = useState('');
	const [pwdVisibility, setPwdVisibility] = useState(false);
	const [pwdCfmVisibility, setPwdCfmVisibility] = useState(false);
	const [validation, setValidation] = useState({ email: false, nickname: false, pwd: false, pwdCfm: false });
	const [error, setError] = useState(null);
	const setUer = useSetUser();

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

		if (!nickname) {
			setNicknameError('닉네임을 입력해주세요.');
			setValidation(draft => ({ ...draft, nickname: false }));
		} else if (NICKNAME_REGEX.test(nickname)) {
			setNicknameError('');
			setValidation(draft => ({ ...draft, nickname: true }));
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
	}, [email, nickname, pwd, pwdCfm]);

	const handleSignup = async () => {
		if (validation.email && validation.nickname && validation.pwd && validation.pwdCfm) {
			try {
				const salt = generateRandomHexString();
				const pwdEncrypted = encrypt(salt, pwd, ITER_FULL);
				setPwd('');
				setPwdCfm('confirmed');
				const result = await postSignup({ email, nickname, salt, pwdEncrypted, pwdCfm });
				if (result) {
					setUer(result);
					localStorage.setItem('userUuid', result.id);
					localStorage.setItem('nickname', result.nickname);
					localStorage.setItem('sessionPwd', result.sessionPwd);
					localStorage.setItem('sessionCreatedAt', result.createdAt);
				}
			} catch (err) {
				setError(err);
			}
		} else {
			setError({
				message: `입력값이 유효하지 않습니다.\nemail: ${validation.email ? 'valid' : 'invalid'}\nnickname: ${validation.nickname ? 'valid' : 'invalid'}\npassword: ${validation.pwd ? 'valid' : 'invalid'}\npassword confirm: ${validation.pwdCfm ? 'valid' : 'invalid'}`,
			});
		}
	};

	return (
		<>
			<section className={styles.section}>
				<Link to="/">
					<img className={styles.logo} src="/images/site-logo.png" alt="View My StartUp Logo" />
				</Link>
				<form>
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
					<label htmlFor="nickname">
						닉네임
						<input
							id="nickname"
							name="nickname"
							placeholder="닉네임을 입력해주세요"
							type="text"
							autoComplete="on"
							required
							className={!nickname || NICKNAME_REGEX.test(nickname) ? styles.alert : ''}
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
									if (e.code === 'Enter') {
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
					<div className={styles.oauth_images}>
						<a
							target="_blank"
							href="#login"
							onClick={() => {
								window.open(
									`https://accounts.google.com/o/oauth2/v2/auth?cliend_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent('')}&response_type=token&scope=${encodeURIComponent(`https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`)}&state=${state}&prompt=consent`,
								);
								return false;
							}}
							rel="noreferrer"
						>
							<img src="/images/oauth-Google.png" alt="구글로 가입하기" className={styles.img_oauth} />
						</a>
						<a target="_blank" href="https://www.kakaocorp.com/page/" rel="noreferrer">
							<img src="/images/oauth-Kakao.png" alt="카카오로 가입하기" className={styles.img_oauth} />
						</a>
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
