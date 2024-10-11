import { useEffect, useState } from 'react';
import style from './InvestmentModals.module.css';
import icDelete from '../assets/ic_delete.png';
import noImage from '../assets/no_image.png';
import eyeOn from '../assets/ic_eye_on.png';
import eyeOff from '../assets/ic_eye_off.png';
import { postInvestment } from '../shared/apis/investmentApis.js';
import { useUser } from '../context/UserProvider.jsx';

const initialDetail = {
	name: '',
	amount: '',
	comment: '',
	password: '',
	userId: '',
	companyId: '',
};

function InvestmentPostModal({ companyDetail, onClose, onPost, show = false }) {
	const user = useUser();
	const [isPWshow, setIsPWshow] = useState(false);
	const [isPWCheckshow, setIsPWCheckshow] = useState(false);
	const [detail, setDetail] = useState(initialDetail);
	const [pw, setPw] = useState('');
	const [pwCheck, setPwCheck] = useState('');

	// NOTE show가 false이면 아무것도 렌더하지 않음
	if (!show) return null;

	const togglePWshow = () => {
		setIsPWshow(!isPWshow);
	};
	const togglePWCheckshow = () => {
		setIsPWCheckshow(!isPWCheckshow);
	};

	const handlePost = () => {
		const postData = async () => {
			const body = { ...detail, amount: Number(detail.amount), password: pw, userId: user.userUuid, companyId: companyDetail.id };

			const investment = await postInvestment(body);
		};
		postData();
		onPost();
	};

	return (
		<div id={style.InvestmentUpdateModal}>
			<div id={style.modalHeader}>
				<p>투자 정보 수정</p>
				<button type="button" onClick={onClose}>
					<img src={icDelete} alt="modalOff" />
				</button>
			</div>

			<form id={style.modalBody}>
				<div id={style.info}>
					<p>투자 기업 정보</p>
					<div>
						<img src={companyDetail.logo ?? noImage} alt="companyLogo" />
						<p>{companyDetail.name}</p>
						<p>{companyDetail.category}</p>
					</div>
				</div>
				<div id={style.name}>
					<label htmlFor="name">투자자 이름</label>
					<input
						id="name"
						type="text"
						placeholder="투자자 이름을 입력해 주세요"
						value={detail.name}
						onChange={e =>
							setDetail(prev => {
								return { ...prev, name: e.target.value };
							})
						}
					/>
				</div>
				<div id={style.amount}>
					<label htmlFor="amount">투자 금액</label>
					<input
						id="amount"
						type="number"
						placeholder="투자 금액을 입력해 주세요"
						value={detail.amount}
						onChange={e =>
							setDetail(prev => {
								return { ...prev, amount: e.target.value };
							})
						}
					/>
				</div>
				<div id={style.comment}>
					<label htmlFor="comment">투자 코멘트</label>
					<textarea
						id="comment"
						placeholder="투자에 대한 코멘트를 입력해 주세요"
						value={detail.comment}
						onChange={e =>
							setDetail(prev => {
								return { ...prev, comment: e.target.value };
							})
						}
					/>
				</div>
				<div id={style.password}>
					<label htmlFor="password">비밀번호</label>
					<input
						id="password"
						type={isPWshow ? '' : 'password'}
						placeholder="비밀번호를 입력해 주세요"
						value={pw}
						onChange={e => {
							setPw(e.target.value);
						}}
					/>
					<img id={style.eye} src={isPWshow ? eyeOn : eyeOff} alt="비밀번호 표시" onClick={togglePWshow} />
				</div>
				<div id={style.password}>
					<label htmlFor="passwordCheck">비밀번호 확인</label>
					<input
						id="passwordCheck"
						type={isPWCheckshow ? '' : 'password'}
						placeholder="비밀번호를 다시 한 번 입력해 주세요"
						value={pwCheck}
						onChange={e => {
							setPwCheck(e.target.value);
						}}
					/>
					<img id={style.eye} src={isPWCheckshow ? eyeOn : eyeOff} alt="비밀번호 표시" onClick={togglePWCheckshow} />
				</div>
			</form>

			<div id={style.modalFooter}>
				<button type="button" className={`${style.modal} ${style.cancel}`} onClick={onClose}>
					취소
				</button>
				<button type="button" className={style.modal} onClick={handlePost}>
					투자하기
				</button>
			</div>
		</div>
	);
}

export default InvestmentPostModal;
