import { xml2json } from "xml-js";

interface WildfireItem {
  date: string;
  location: string;
  time: string;
  cause: string;
}

interface WildfireXmlItem {
  startyear?: { _text?: string };
  startmonth?: { _text?: string };
  startday?: { _text?: string };
  locsi?: { _text?: string };
  locdong?: { _text?: string };
  locgungu?: { _text?: string };
  starttime?: { _text?: string };
  firecause?: { _text?: string };
}

const SERVICE_KEY =
  "xNPW3bBwt8j3dOB9niigELSJ6hRgpxaeIun8XdyUN93%2FDJTyc%2BvpMpAcoCjcesOF96l0wsLx65PrA9fHgZYzMQ%3D%3D";

export async function getWildfireStatsByPeriod(
  startYear: string,
  startMonth: string,
  endYear: string,
  endMonth: string
): Promise<WildfireItem[]> {
  // 월은 2자리
  const pad = (n: string) => n.padStart(2, "0");
  const searchStDt = `${startYear}${pad(startMonth)}01`;
  const searchEdDt = `${endYear}${pad(endMonth)}31`; // 말일은 31로 처리

  const url = `/api/forest-fire/getfirestatsservice?ServiceKey=${SERVICE_KEY}&numOfRows=100&pageNo=1&searchStDt=${searchStDt}&searchEdDt=${searchEdDt}`;

  const res = await fetch(url);
  const xmlText = await res.text();

  const jsonData = JSON.parse(xml2json(xmlText, { compact: true }));

  const items = jsonData.response?.body?.items?.item;

  if (!items) return [];

  const formatted: WildfireXmlItem[] = Array.isArray(items) ? items : [items];

  return formatted.map((item): WildfireItem => {
    // 날짜: YYYY-MM-DD 형태로 재조립
    const date =
      item.startyear?._text && item.startmonth?._text && item.startday?._text
        ? `${item.startyear._text}-${pad(
            item.startmonth._text
          )}-${item.startday._text.padStart(2, "0")}`
        : "";

    // 시, 군구, 동, 없으면 빈 문자열
    const location = [
      item.locsi?._text,
      item.locgungu?._text,
      item.locdong?._text,
    ]
      .filter(Boolean)
      .join(" ");

    return {
      date,
      location,
      time: item.starttime?._text || "",
      cause: item.firecause?._text || "",
    };
  });
}
