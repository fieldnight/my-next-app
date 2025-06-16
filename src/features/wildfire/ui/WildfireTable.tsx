"use client";
import { useState } from "react";
import { getWildfireStatsByPeriod } from "../api/getWildfireStats";

interface WildfireItem {
  date: string;
  location: string;
  time: string;
  cause: string;
}

export default function WildfireTable() {
  const [startYear, setStartYear] = useState("2022");
  const [startMonth, setStartMonth] = useState("01");
  const [endYear, setEndYear] = useState("2022");
  const [endMonth, setEndMonth] = useState("12");

  const [tempStartYear, setTempStartYear] = useState("2022");
  const [tempStartMonth, setTempStartMonth] = useState("01");
  const [tempEndYear, setTempEndYear] = useState("2022");
  const [tempEndMonth, setTempEndMonth] = useState("12");

  const [data, setData] = useState<WildfireItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const years = ["2020", "2021", "2022", "2023", "2024"];
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  const fetchData = async () => {
    setLoading(true);
    const result = await getWildfireStatsByPeriod(
      tempStartYear,
      tempStartMonth,
      tempEndYear,
      tempEndMonth
    );
    setStartYear(tempStartYear);
    setStartMonth(tempStartMonth);
    setEndYear(tempEndYear);
    setEndMonth(tempEndMonth);
    setData(result);
    setCurrentPage(1); // 조회 시 첫 페이지로 초기화
    setLoading(false);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <h2>산불 발생 통계 조회</h2>
      <div style={{ marginBottom: 16 }}>
        <label>
          시작년도:
          <select
            value={tempStartYear}
            onChange={(e) => setTempStartYear(e.target.value)}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: 12 }}>
          시작월:
          <select
            value={tempStartMonth}
            onChange={(e) => setTempStartMonth(e.target.value)}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: 24 }}>
          종료년도:
          <select
            value={tempEndYear}
            onChange={(e) => setTempEndYear(e.target.value)}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: 12 }}>
          종료월:
          <select
            value={tempEndMonth}
            onChange={(e) => setTempEndMonth(e.target.value)}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <button style={{ marginLeft: 16 }} onClick={fetchData}>
          조회
        </button>
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <h3>
            {startYear}년 {startMonth}월 ~ {endYear}년 {endMonth}월 산불 통계 (
            {data.length}건)
          </h3>
          <table
            border={1}
            cellPadding={6}
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th>날짜</th>
                <th>위치</th>
                <th>시간</th>
                <th>원인</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                currentItems.map((fire, idx) => (
                  <tr key={idx}>
                    <td>{fire.date}</td>
                    <td>{fire.location}</td>
                    <td>{fire.time}</td>
                    <td>{fire.cause}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {data.length > itemsPerPage && (
            <div style={{ marginTop: 12, textAlign: "center" }}>
              <button onClick={handlePrev} disabled={currentPage === 1}>
                이전
              </button>
              <span style={{ margin: "0 12px" }}>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
