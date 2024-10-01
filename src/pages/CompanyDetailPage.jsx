function CompanyDetailPage() {
	return (
		<div id="companyDetailPage" style={{ width: 1200 }}>
			<div id="investments" style={{ width: '100%', height: 583, display: 'flex', flexDirection: 'column', gap: 24 }}>
				<div
					id="investmentsHeader"
					style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', height: 40 }}
				>
					<p style={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap', fontSize: 20, fontWeight: 700 }}>
						View My Startup에서 받은 투자
					</p>
					<button
						type="button"
						style={{
							padding: '8px 24px',
							backgroundColor: '#EB5230',
							borderRadius: 50,
							color: 'white',
							fontWeight: 600,
							fontSize: 16,
							textAlign: 'center',
						}}
					>
						기업투자하기
					</button>
				</div>

				<div id="investmentBody" style={{ display: 'flex', flexDirection: 'column' }}>
					<table style={{ width: '100%', height: 375, paddingTop: 16 }}>
						<thead>총 X원</thead>
						<tr className="table-margin" style={{ height: 16 }} />
						<tr height="39px">
							<th width="84px">투자자 이름</th>
							<th width="84px">순위</th>
							<th width="84px">투자 금액</th>
							<th>투자 코멘트</th>
						</tr>
						<tr className="table-margin" style={{ height: 16 }} />
						<tr style={{ textAlign: 'center' }}>
							<td>김연우</td>
							<td>1위</td>
							<td>10억</td>
							<td style={{ textAlign: 'left' }}>코드잇은 정말 훌륭한 기업입니다!</td>
						</tr>
						<tr style={{ textAlign: 'center' }}>
							<td>김연우</td>
							<td>1위</td>
							<td>10억</td>
							<td style={{ textAlign: 'left' }}>코드잇은 정말 훌륭한 기업입니다!</td>
						</tr>
						<tr style={{ textAlign: 'center' }}>
							<td>김연우</td>
							<td>1위</td>
							<td>10억</td>
							<td style={{ textAlign: 'left' }}>코드잇은 정말 훌륭한 기업입니다!</td>
						</tr>
						<tr style={{ textAlign: 'center' }}>
							<td>김연우</td>
							<td>1위</td>
							<td>10억</td>
							<td style={{ textAlign: 'left' }}>코드잇은 정말 훌륭한 기업입니다!</td>
						</tr>
						<tr style={{ textAlign: 'center' }}>
							<td>김연우</td>
							<td>1위</td>
							<td>10억</td>
							<td style={{ textAlign: 'left' }}>코드잇은 정말 훌륭한 기업입니다!</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	);
}

export default CompanyDetailPage;
