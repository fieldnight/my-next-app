"use client";

import { useState } from "react";
import { WildfireStage } from "@/entities/step/types";

interface Props {
  data: WildfireStage[];
}

const ITEMS_PER_PAGE = 10;

export default function StepTable({ data }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">발생일</th>
            <th className="border px-4 py-2">주소</th>
            <th className="border px-4 py-2">1단계</th>
            <th className="border px-4 py-2">2단계</th>
            <th className="border px-4 py-2">3단계</th>
            <th className="border px-4 py-2">4단계</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, idx) => (
            <tr key={idx} className="even:bg-gray-50">
              <td className="border px-4 py-2">{row.산불발생일}</td>
              <td className="border px-4 py-2">{row.산불발생주소}</td>
              <td className="border px-4 py-2">
                {row.산불1단계발령일시 || "-"}
              </td>
              <td className="border px-4 py-2">
                {row.산불2단계발령일시 || "-"}
              </td>
              <td className="border px-4 py-2">
                {row.산불3단계발령일시 || "-"}
              </td>
              <td className="border px-4 py-2">
                {row.산불4단계발령일시 || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          이전
        </button>
        <span className="text-sm">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
