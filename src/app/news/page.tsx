// app/news/page.tsx

import * as xml2js from "xml2js";
import * as cheerio from "cheerio";
import { notFound } from "next/navigation";
import { NavigateBar } from "@/features";

// 뉴스 타입
type NewsItem = {
  title: string;
  link: string;
  summary?: string;
  pubDate?: string;
};

type RssItem = {
  title: [string];
  link: [string];
  description?: [string];
  pubDate?: [string];
};

// 요약 추출
function extractCleanSummary(
  title: string,
  description: string
): string | undefined {
  const $ = cheerio.load(description || "");
  let text = $.text().trim();

  if (text.startsWith(title)) text = text.replace(title, "").trim();
  text = text.replace(/\s+/g, " ");
  if (text.length < 20) return undefined;

  return text.length > 100 ? text.slice(0, 100) + "..." : text;
}

// 날짜 포맷
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    if (diffHours < 1) return "방금 전";
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffHours < 48) return "1일 전";

    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

// 뉴스 fetch
async function fetchWildfireNews(): Promise<NewsItem[]> {
  const res = await fetch(
    "https://news.google.com/rss/search?q=산불&hl=ko&gl=KR&ceid=KR:ko",
    {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NewsBot/1.0)",
      },
    }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const xml = await res.text();
  const result = await xml2js.parseStringPromise(xml, { explicitArray: true });
  const items: RssItem[] = result.rss?.channel?.[0]?.item || [];

  return items
    .map((item) => {
      const title = item.title?.[0] ?? "제목 없음";
      const link = item.link?.[0] ?? "#";
      const description = item.description?.[0] ?? "";
      const pubDate = item.pubDate?.[0] ?? "";
      const summary = extractCleanSummary(title, description);
      return { title, link, summary, pubDate };
    })
    .filter((n) => !!n.pubDate)
    .sort(
      (a, b) => new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime()
    ); // 최신순 정렬
}

// 메인 페이지 컴포넌트
export default async function NewsPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page || "1");
  const pageSize = 9;

  if (isNaN(page) || page < 1) return notFound();

  const newsItems = await fetchWildfireNews();
  const total = newsItems.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const currentItems = newsItems.slice(start, end);

  return (
    <div className="flex items-center justify-center h-screen my-10">
      <main className="pt-10 w-[70%] h-screen border rounded-2xl shadow-md bg-gradient-green  ">
        <div className="flex flex-row justify-between items-center p-4">
          <div>새빛산으로</div>
          <NavigateBar />
        </div>

        <main className="p-4 h-screen border rounded-2xl shadow-md bg-white p-10">
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2">🔥 산불 관련 뉴스</h1>
            <p className="text-gray-600">최신 산불 뉴스를 확인하세요</p>
          </header>

          {currentItems.length === 0 ? (
            <p className="text-center text-gray-500">뉴스가 없습니다.</p>
          ) : (
            <section className="grid grid-cols-3 gap-4">
              {currentItems.map(({ title, link, pubDate }, index) => (
                <article
                  key={`${link}-${index}`}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition py-15 "
                >
                  <h2 className="text-base font-semibold mb-2">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {title}
                    </a>
                  </h2>
                  <p className="text-xs text-gray-500 mb-3">
                    {formatDate(pubDate!)}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      자세히 보기
                    </a>

                    <div className="flex space-x-2">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          title
                        )}&url=${encodeURIComponent(link)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="트위터 공유"
                      >
                        <img
                          src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg"
                          alt="트위터"
                          className="w-4 h-4 opacity-70 hover:opacity-100"
                        />
                      </a>
                      <a
                        href={`https://www.instagram.com/?url=${encodeURIComponent(
                          link
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="인스타그램 공유"
                      >
                        <img
                          src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg"
                          alt="인스타그램"
                          className="w-4 h-4 opacity-70 hover:opacity-100"
                        />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}

          {/* 페이지네이션 */}
          <div className="flex justify-center gap-2 mt-10">
            {page > 1 && (
              <a
                href={`?page=${page - 1}`}
                className="text-sm px-4 py-2 border rounded hover:bg-gray-100"
              >
                ◀ 이전
              </a>
            )}
            {end < total && (
              <a
                href={`?page=${page + 1}`}
                className="text-sm px-4 py-2 border rounded hover:bg-gray-100"
              >
                다음 ▶
              </a>
            )}
          </div>

          <footer className="mt-8 text-center text-sm text-gray-500">
            뉴스는 Google News에서 제공됩니다
          </footer>
        </main>
      </main>
    </div>
  );
}
