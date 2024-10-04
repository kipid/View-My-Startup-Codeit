import { useState } from 'react';
import kebab from '../assets/ic_kebab.png';
import style from './TouchInvestment.module.css';

function TouchInvestment({ investmentDetail, onUpdate, onDelete }) {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
	const handleUpdate = () => {
		onUpdate(investmentDetail);
		setDropdownOpen(false);
	};
	const handleDelete = () => {
		onDelete(investmentDetail);
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
