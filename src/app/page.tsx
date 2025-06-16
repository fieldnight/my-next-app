import { promises as fs } from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import iconv from "iconv-lite";
import { TodaySection, WildfireTable } from "@/features";

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
    <div>
      {" "}
      <TodaySection />
      <WildfireTable /> <StepSection data={records} />
    </div>
  );
}
// 이 코드는 CSV 파일을 읽고, 파싱하여 WildfireDisplaySection 컴포넌트에 전달합니다.
