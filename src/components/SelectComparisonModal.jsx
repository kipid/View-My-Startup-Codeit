import { useEffect, useState } from "react";
import Pagination from "./Pagination.jsx";
import closeIcon from "../assets/ic_delete.png";
import noLogo from "../assets/no-logo.png";
import checkIcon from "../assets/ic_check.png";
import styles from "./SelectComparisonModal.module.css";

// 회사 목록 GET api 구현 전 임시 데이터
const companies = [
  {
    id: "7cde6d4e-4f79-4b36-9b6e-5f8a5635fbb4",
    name: "우주상회",
    category: "유통",
  },
  {
    id: "d8b12943-01b0-4f6c-8528-6b57db67c72b",
    name: "달나라택배",
    category: "물류",
  },
  {
    id: "e5f9a2f8-67b3-4898-b7f7-063cfc76de0a",
    name: "별빛교육원",
    category: "교육",
  },
  {
    id: "b9ac64e9-61b2-423f-9642-75a8500af1ae",
    name: "미래전기차",
    category: "제조",
  },
  {
    id: "1b8f7a9e-23ad-437e-914f-97e5d7cb92df",
    name: "한강보트",
    category: "레저",
  },
  {
    id: "f49c5e6d-b917-4b30-92c6-77d2f9f5df93",
    name: "바다바람유통",
    category: "유통",
  },
  {
    id: "ee62d6b8-ecba-49d6-9ff0-349b73962f43",
    name: "드림클라우드",
    category: "IT",
  },
  {
    id: "8893c0fb-788a-46f2-8aa5-c8ec5b7f473e",
    name: "무지개택배",
    category: "물류",
  },
  {
    id: "bb4b49c8-9a4b-44c3-b7a9-89950fe32e8e",
    name: "행복학교",
    category: "교육",
  },
  {
    id: "a42ad06e-73bb-4aa2-a842-64cc79c0e3be",
    name: "빛나는전구",
    category: "제조",
  },
  {
    id: "e490c64c-8a96-41c3-a8fe-77e3f9e8ff5d",
    name: "파란하늘식품",
    category: "식품",
  },
  {
    id: "ae8c7b63-bec4-401a-87a0-60b85c74b8a9",
    name: "빅데이터솔루션",
    category: "IT",
  },
  {
    id: "c99d4b26-5d71-4604-88b6-9b8d94f0c7e6",
    name: "미소택배",
    category: "물류",
  },
  {
    id: "f36f2de8-fb36-4a60-96b6-9796aebf3d9a",
    name: "열린교육센터",
    category: "교육",
  },
  {
    id: "7aeabf6e-19e8-4c2e-9a29-cf47a3a5e9fe",
    name: "산들바람유통",
    category: "유통",
  },
];

function CompanySelectList({ item, onSelect, isSelected, isSelectedList }) {
  const handleClick = () => {
    onSelect(item, !isSelected);
  };

  return (
    <div className={styles.companyListWrapper}>
      <div className={styles.companyInfo}>
        <img
          className={styles.companyLogo}
          src={item.logo ? item.logo : noLogo}
          alt={item.id}
        />
        <p className={styles.companyName}>{item.name}</p>
        <p className={styles.companyCategory}>{item.category}</p>
      </div>
      {isSelectedList ? (
        <button
          className={styles.cancelSelectButton}
          onClick={() => onSelect(item, false)}
        >
          선택 해제
        </button>
      ) : (
        <button
          className={isSelected ? styles.clickedButton : styles.unclickedButton}
          onClick={handleClick}
        >
          {isSelected ? (
            <div className={styles.clickedButtonContents}>
              <img
                src={checkIcon}
                alt="선택 완료"
                className={styles.checkIcon}
              />
              <span>선택완료</span>
            </div>
          ) : (
            "선택하기"
          )}
        </button>
      )}
    </div>
  );
}

// 모달 종료 시 selectedCompanies 데이터 props로 전달 구현 추가 예정
function SelectComparisonModal({ onClose }) {
  const [pageNum, setPageNum] = useState(1);
  const [pageNumMax, setPageNumMax] = useState(5);
  const [search, setSearch] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleKeyUp = (e) => {
    const keyword = e.target.value.trim();
    setSearch(keyword);
  };

  const searchedCompanies = search
    ? companies.filter(
        (company) =>
          company.name.includes(search) || company.category.includes(search)
      )
    : companies;
  const searchTotal = searchedCompanies.length;

  const handleSelect = (item, isSelected) => {
    if (isSelected) {
      if (selectTotal < 5) {
        setSelectedCompanies((prev) => [...prev, item.id]);
        setErrorMessage("");
      } else {
        setErrorMessage("*비교할 기업은 최대 5개까지 선택 가능합니다.");
      }
    } else {
      setSelectedCompanies((prev) => prev.filter((id) => id !== item.id));
      setErrorMessage("");
    }
  };
  const selectTotal = selectedCompanies.length;

  const companiesPerPage = 5;
  const startIndex = (pageNum - 1) * companiesPerPage;
  const endIndex = Math.min(startIndex + companiesPerPage, searchTotal);
  const currentPage = searchedCompanies.slice(startIndex, endIndex);

  useEffect(() => {
    setPageNumMax(Math.ceil(searchTotal / companiesPerPage));
  }, [searchTotal, searchedCompanies]);

  return (
    <>
      <div className={styles.modalHead}>
        <p className={styles.modalTitle}>비교할 기업 선택하기</p>
        <img
          className={styles.closeIcon}
          src={closeIcon}
          alt="닫기"
          onClick={onClose}
        />
      </div>
      <input
        className={styles.searchInput}
        placeholder="검색어를 입력해 주세요."
        onChange={handleKeyUp}
      />
      <p className={styles.modalSubtitle}>선택한 기업 ({selectTotal})</p>
      {companies
        .filter((company) => selectedCompanies.includes(company.id))
        .map((company) => (
          <CompanySelectList
            key={company.id}
            item={company}
            onSelect={handleSelect}
            isSelected={true}
            isSelectedList={true}
          />
        ))}
      <p className={styles.modalSubtitle}>검색 결과 ({searchTotal})</p>
      {currentPage.map((company) => (
        <CompanySelectList
          key={company.id}
          item={company}
          onSelect={handleSelect}
          isSelected={selectedCompanies.includes(company.id)}
          isSelectedList={false}
        />
      ))}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <Pagination
        pageNum={pageNum}
        setPageNum={setPageNum}
        pageNumMax={pageNumMax}
      />
      <div className={styles.blankSpace}></div>
    </>
  );
}

export default SelectComparisonModal;
