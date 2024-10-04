import { useEffect, useRef, useState } from 'react';
import kebab from '../assets/ic_kebab.png';
import style from './TouchInvestment.module.css';

function TouchInvestment({ investmentDetail, onUpdate, onDelete }) {
	const dropdownRef = useRef();
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

	useEffect(() => {
		const handleClickOutside = e => {
			// NOTE Ref의 current에 담긴 엘리먼트가 아닌 곳(바깥)을 클릭 시 드롭다운 메뉴 닫힘
			if (dropdownOpen && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
		};
		document.addEventListener('click', handleClickOutside);

		return () => document.removeEventListener('click', handleClickOutside);
	}, [dropdownOpen]);

	return (
		<div id={style.dropdownWrapper} ref={dropdownRef}>
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
