import React from 'react';
import styles from './CompanyList.module.css'; // 스타일 파일을 따로 생성하여 리스트 스타일을 지정합니다.

const CompanyList = ({ companies }) => {
  return (
    <div className={styles.companyList}>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>기업 명</th>
            <th>기업 소개</th>
            <th>카테고리</th>
            <th>누적 투자 금액</th>
            <th>매출액</th>
            <th>고용 인원</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={company.id}>
              <td>{index + 1}위</td>
              <td>{company.name}</td>
              <td>{company.description}</td>
              <td>{company.category}</td>
              <td>{company.cumulativeInvestmentAmount} 원</td>
              <td>{company.renenue} 원</td>
              <td>{company.employees} 명</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
