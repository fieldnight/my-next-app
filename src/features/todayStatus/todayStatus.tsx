"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { parseStringPromise } from "xml2js";

type FireItem = {
  frfrInfoId: string;
  frfrSttmnDt: string;
  frfrSttmnHms: string;
  frfrOccrrTpcdNm: string;
  frfrPrgrsStcdNm: string;
  frfrStepIssuCd: string;
};

type RawFireItem = {
  frfrInfoId?: string[];
  frfrSttmnDt?: string[];
  frfrSttmnHms?: string[];
  frfrOccrrTpcdNm?: string[];
  frfrPrgrsStcdNm?: string[];
  frfrStepIssuCd?: string[];
};

const API_KEY =
  "nXeJZnZTi6fioQ1mKaKtGnh5Q90XIZKEiU3m0xiZVRzwdPRTD%252BYkvToEb9dYaC4kMSv5Xs9A7nowL6UQUwr%252BmtxOsDdiluH1UzcFfAxyGvc%253D";

export default function FireStatusPage() {
  const [fires, setFires] = useState<FireItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFireStatus() {
      try {
        const res = await axios.post(
          "https://www.bigdata-forest.kr/todayFire",
          { apiKey: API_KEY },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const xml = res.data;
        const json = await parseStringPromise(xml);
        const rawItems: RawFireItem[] = json.ROOT.DATA || [];

        const fireItems: FireItem[] = rawItems.map((item) => ({
          frfrInfoId: item.frfrInfoId?.[0] || "",
          frfrSttmnDt: item.frfrSttmnDt?.[0] || "",
          frfrSttmnHms: item.frfrSttmnHms?.[0] || "",
          frfrOccrrTpcdNm: item.frfrOccrrTpcdNm?.[0] || "",
          frfrPrgrsStcdNm: item.frfrPrgrsStcdNm?.[0] || "",
          frfrStepIssuCd: item.frfrStepIssuCd?.[0] || "",
        }));

        setFires(fireItems);
      } catch (err) {
        console.error("산불 현황 가져오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFireStatus();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🔥 Today&apos;s Wildfire Status</h1>

      {loading ? (
        <p className="text-gray-500">로딩 중...</p>
      ) : fires.length === 0 ? (
        <p className="text-gray-500">오늘 등록된 산불 정보가 없습니다.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">신고 ID</th>
              <th className="border p-2">신고일</th>
              <th className="border p-2">신고시각</th>
              <th className="border p-2">발생구분</th>
              <th className="border p-2">진행상태</th>
              <th className="border p-2">단계코드</th>
            </tr>
          </thead>
          <tbody>
            {fires.map((fire) => (
              <tr key={fire.frfrInfoId}>
                <td className="border px-2 py-1 text-center">
                  {fire.frfrInfoId}
                </td>
                <td className="border px-2 py-1 text-center">
                  {fire.frfrSttmnDt}
                </td>
                <td className="border px-2 py-1 text-center">
                  {fire.frfrSttmnHms}
                </td>
                <td className="border px-2 py-1 text-center">
                  {fire.frfrOccrrTpcdNm}
                </td>
                <td className="border px-2 py-1 text-center">
                  {fire.frfrPrgrsStcdNm}
                </td>
                <td className="border px-2 py-1 text-center">
                  {fire.frfrStepIssuCd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
