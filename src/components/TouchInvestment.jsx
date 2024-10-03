import { useState } from 'react';
import kebab from '../assets/ic_kebab.png';
import style from './TouchInvestment.module.css';

function TouchInvestment({ investmentDetail, onChange }) {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
	const handleUpdate = () => {
		setDropdownOpen(false);
	};
	const handleDelete = () => {
		setDropdownOpen(false);
	};

	return (
		<div id={style.dropdownWrapper}>
			<button type="button" onClick={toggleDropdown}>
				<img src={kebab} alt="kebab menu Icon" />
			</button>
			{dropdownOpen && (
				<ul id={style.dropdown}>
					<li onClick={handleUpdate}>수정하기</li>
					<li onClick={handleDelete}>삭제하기</li>
				</ul>
			)}
		</div>
	);
}

export default TouchInvestment;

// const style = {
// 	'sort-order': css`
// 		height: 100%;
// 		width: 13rem;
// 		border-radius: 12px;
// 		border: 1px solid var(--gray-200);
// 		padding: 1.2rem 2rem;
// 		background-color: white;

// 		color: var(--gray-800);
// 		font-weight: 400;
// 		font-size: 1.6rem;
// 		line-height: 2.6rem;
// 		text-align: center;

// 		display: flex;
// 		align-items: center;
// 		justify-content: space-between;

// 		@media (max-width: ${CONSTANTS.BREAKPOINTS.MOBILE}px) {
// 			width: 4.2rem;

// 			justify-content: center;
// 		}
// 	`,

// 	'sort-order-list': css`
// 		position: absolute;
// 		display: grid;
// 		grid-template-rows: repeat(2, 4.2rem);
// 		grid-gap: 0;
// 		margin-top: 0.8rem;
// 		width: 13rem;

// 		li {
// 			display: flex;
// 			align-items: center;
// 			justify-content: center;
// 			cursor: pointer;
// 			border: 1px solid var(--gray-200);
// 			border-bottom: 0;
// 			border-radius: 1.2rem 1.2rem 0 0;
// 			background-color: #ffffff;
// 			color: var(--gray-800);
// 			font-size: 1.6rem;
// 			font-weight: 400;
// 			line-height: 2.6rem;

// 			&:last-child {
// 				border-bottom: 1px solid var(--gray-200);
// 				border-radius: 0 0 1.2rem 1.2rem;
// 			}

// 			&:hover {
// 				background-color: var(--Primary-100);
// 				color: var(--gray-50);
// 				border: none;
// 			}
// 		}

// 		@media (max-width: ${CONSTANTS.BREAKPOINTS.MOBILE}px) {
// 			transform: translateX(-8.8rem);
// 		}
// 	`,
// };
