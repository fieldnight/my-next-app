import { promises as fs } from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import iconv from "iconv-lite";
import Image from "next/image"; // ✅ next/image import
import {
  NavigateBar,
  RecentPosts,
  TodaySection,
  WildfireTable,
} from "@/features";
import StepSection from "@/features/step/ui/stepSection";
import { WildfireStage } from "@/entities/step/types";

export default async function HomePage() {
  const filePath = path.join(process.cwd(), "src/data/wildfire.csv");
  const buffer = await fs.readFile(filePath);
  const csvText = iconv.decode(buffer, "euc-kr"); // 또는 cp949

  const records: WildfireStage[] = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
  });

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[1200px] mx-auto">
      {/* ✅ Hero 섹션 */}
      <div className="relative w-full h-[900px] rounded-4xl overflow-hidden shadow-md my-10">
        {/* 배경 이미지 */}
        <Image
          src="/Back1.svg"
          alt="배경 이미지"
          fill
          className="object-cover z-0"
        />

        {/* 오버레이 콘텐츠 */}
        <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center ">
          <NavigateBar />
          <div className="flex flex-row justify-center items-center gap-5 mt-10 px-8">
            <div className="flex flex-col justify-start items-start   ">
              <Image
                src="/title.svg"
                alt="새빛산으로"
                width={600}
                height={400}
              />
              <div className="text-xl font-bold mb-2">자원봉사 모집글</div>
              <div className="mb-4">
                우리 손으로 지켜내는 강산! <br /> 산불 지역 복구 자원봉사와
                플로깅 소식 등을 확인하실 수 있습니다.
              </div>
              <RecentPosts />
            </div>
            <Image
              src="/Reported.svg"
              alt="신고 아이콘"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>

      <div className="border rounded-2xl shadow-md bg-green-950 w-full px-8 -translate-y-10 ">
        <div className="flex flex-col items-center justify-center gap-5 border rounded-2xl shadow-md bg-white w-full px-6 py-8">
          <TodaySection />
          <WildfireTable />
        </div>
      </div>

      <div className="border rounded-2xl shadow-md bg-yellow-200 w-full px-8 -translate-y-16">
        <StepSection data={records} />
      </div>
    </div>
  );
}
