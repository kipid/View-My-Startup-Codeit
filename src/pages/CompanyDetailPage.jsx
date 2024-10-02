import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination.jsx';
import style from './CompanyDetailPage.module.css';
import logo from '../assets/codeit_logo.svg';
import { INVESTMENT } from '../shared/mock/mock.js';

const name = '코드잇';
const category = 'IT/테크';
const description = `코드잇은 '온라인 코딩 교육 서비스'를 운영하는 EdTech 스타트업입니다.

코딩 교육과 데이터 사이언스 교육에 대한 수요는 급격히 늘어나고 있지만, 아직까지 좋은 교육 서비스를 찾기란 쉽지 않습니다. 이를 해결하고자 코드잇은 모든 강의를 자체 제작하여 퀄리티 높은 콘텐츠를 제공하고, 동시에 코딩 교육에 최적화된 플랫폼을 개발하고 있습니다.

모든 강의를 마음껏 들을 수 있는 "코드잇 무제한 멤버십"을 제공하고 있으며, 지난 5년 동안 21만 명의 수강생과 평균 만족도 4.9점이라는 국내 교육 업계에서 보기 드문 성과를 달성하였습니다. 또한 콘텐츠와 기술력을 인정받아 2021년 10월 Series B 투자를 받아 누적 140억 원의 투자를 받았고, 현재 40여 명의 팀원이 같은 목표를 향해 나아가고 있습니다.

“배움의 기쁨을 세상 모두에게.”

이것이 코드잇의 비전입니다. 현재는 최고의 코딩 교육 서비스를 국내에서 제공하고 있지만, 이보다 더 큰 그림을 그리고 있습니다. 2021년 상반기부터 영어권 시장 진출을 시작했고, 코딩과 인접한 분야부터 스펙트럼을 넓혀 나갈 계획입니다.`;
const accumulInvest = 14000000000;
const revenue = 4430000000;
const employee = 95;

const pageSize = 5;

const getScaledNumber = number => {
	const scaler = 10000;
	let scale = 0;
	let rest = number;
	const dic = ['', '만', '억', '조', '경'];

	while (rest >= scaler) {
		rest /= scaler;
		scale += 1;
	}
	const scaled = `${rest}${dic[scale]}`;

	return scaled;
};

function CompanyDetailPage() {
	const [list, setList] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(1);
	const [totalAmount, setTotalAmount] = useState(0);

	useEffect(() => {
		const startIdx = pageSize * (pageNum - 1);
		const data = INVESTMENT.slice(startIdx, startIdx + pageSize);
		const count = INVESTMENT.length;
		const total = INVESTMENT.reduce((acc, cur) => {
			return Number(cur.amount) + acc;
		}, 0);

		setList(data);
		setPageNumMax(Math.ceil(count / pageSize) ?? 1);
		setTotalAmount(total);
	}, [pageNum]);
	const companyDetail = { name, category, accumulInvest, revenue, employee, description };

	return (
		<div id={style.companyDetailPage}>
			<div id={style.companyDetail}>
				<div id={style.companyDetailHeader}>
					<div>
						<img src={logo} alt="companyLogo" />
						<div>
							<p id={style.companyName}>{companyDetail.name}</p>
							<p id={style.companyCategory}>{companyDetail.category}</p>
						</div>
					</div>
				</div>

				<div id={style.companyDetailInfo}>
					<div>
						<p>누적 투자 금액</p>
						<p>{getScaledNumber(companyDetail.accumulInvest)} 원</p>
					</div>
					<div>
						<p>매출액</p>
						<p>{getScaledNumber(companyDetail.revenue)} 원</p>
					</div>
					<div>
						<p>고용 인원</p>
						<p>{companyDetail.employee}명</p>
					</div>
				</div>

				<div id={style.companyDetailDesc}>
					<p>기업 소개</p>
					<pre>{companyDetail.description}</pre>
				</div>
			</div>

			<div id={style.investments}>
				<div id={style.investmentsHeader}>
					<p>View My Startup에서 받은 투자</p>
					<button type="button">기업투자하기</button>
				</div>

				<div id={style.investmentBody}>
					<table>
						<caption>총 {totalAmount}원</caption>
						<thead>
							<tr>
								<th>투자자 이름</th>
								<th>순위</th>
								<th>투자 금액</th>
								<th>투자 코멘트</th>
							</tr>
						</thead>
						<tbody>
							{list.map((item, idx) => {
								return (
									<tr key={item.id}>
										<td>{item.name}</td>
										<td>{idx + 1 + (pageNum - 1) * pageSize}위</td>
										<td>{item.amount}원</td>
										<td>{item.comment}</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					<Pagination pageNum={pageNum} pageNumMax={pageNumMax} setPageNum={setPageNum} />
				</div>
			</div>
		</div>
	);
}

export default CompanyDetailPage;
