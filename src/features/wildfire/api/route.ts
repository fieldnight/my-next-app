import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import iconv from "iconv-lite";
import { parse } from "csv-parse/sync";

export async function GET() {
  const filePath = path.join(process.cwd(), "src/data/wildfire.csv");
  const buffer = await fs.readFile(filePath);
  const csvText = iconv.decode(buffer, "euc-kr");

  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
  });

  return NextResponse.json(records);
}
