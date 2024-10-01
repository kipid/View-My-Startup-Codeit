import styles from './Pagination.module.css';

function Pagination({ pageNum, setPageNum, pageNumMax }) {
	let paginationBody;
	if (pageNum <= 1) {
		paginationBody = (
			<>
				<div className={styles.selected}>1</div>
				{pageNumMax >= 2 && <div>2</div>}
				{pageNumMax >= 3 && <div>3</div>}
				{pageNumMax >= 4 && <div>4</div>}
				{pageNumMax >= 5 && <div>5</div>}
			</>
		);
	} else if (pageNum <= pageNumMax && pageNum === 2) {
		paginationBody = (
			<>
				<div>1</div>
				<div className={styles.selected}>2</div>
				{pageNumMax >= 3 && <div>3</div>}
				{pageNumMax >= 4 && <div>4</div>}
				{pageNumMax >= 5 && <div>5</div>}
			</>
		);
	} else if (pageNum <= pageNumMax && pageNum === 3) {
		paginationBody = (
			<>
				<div>1</div>
				<div>2</div>
				<div className={styles.selected}>3</div>
				{pageNumMax >= 4 && <div>4</div>}
				{pageNumMax >= 5 && <div>5</div>}
			</>
		);
	} else if (pageNum < pageNumMax - 2 && pageNum > 3) {
		paginationBody = (
			<>
				<div>{pageNum - 2}</div>
				<div>{pageNum - 1}</div>
				<div className={styles.selected}>{pageNum}</div>
				<div>{pageNum + 1}</div>
				<div>{pageNum + 2}</div>
			</>
		);
	} else if (pageNum === pageNumMax - 2) {
		paginationBody = (
			<>
				<div>{pageNum - 2}</div>
				<div>{pageNum - 1}</div>
				<div className={styles.selected}>{pageNum}</div>
				<div>{pageNum + 1}</div>
				<div>{pageNum + 2}</div>
			</>
		);
	} else if (pageNum === pageNumMax - 1) {
		paginationBody = (
			<>
				<div>{pageNum - 3}</div>
				<div>{pageNum - 2}</div>
				<div>{pageNum - 1}</div>
				<div className={styles.selected}>{pageNum}</div>
				<div>{pageNum + 1}</div>
			</>
		);
	} else {
		paginationBody = (
			<>
				<div>{pageNumMax - 4}</div>
				<div>{pageNumMax - 3}</div>
				<div>{pageNumMax - 2}</div>
				<div>{pageNumMax - 1}</div>
				<div className={styles.selected}>{pageNumMax}</div>
			</>
		);
	}

	return (
		<div
			className={styles.pagination}
			onClick={function (event) {
				const pages = event.currentTarget.querySelectorAll('div');
				const { target } = event;
				const targetN = Number(target.innerText);
				if (isNaN(targetN)) {
					if (!target.classList.contains('disabled')) {
						if (target.innerText === '&lt;' || target.innerText === '<') {
							const pageNumCandi = Number(pages[1].innerText) - 1;
							setPageNum(pageNumCandi <= 1 ? 1 : pageNumCandi);
						} else if (target.innerText === '&gt;' || target.innerText === '>') {
							const pageNumCandi = Number(pages[pages.length - 2].innerText) + 1;
							setPageNum(pageNumCandi >= pageNumMax ? pageNumMax : pageNumCandi);
						}
					}
				} else {
					setPageNum(targetN);
				}
			}}
		>
			<div>&lt;</div>
			{paginationBody}
			<div>&gt;</div>
		</div>
	);
}

export default Pagination;
