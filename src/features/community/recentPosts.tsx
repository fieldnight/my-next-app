"use client";
import { useEffect, useState } from "react";
import { Post } from "./types";

export default function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("posts");
    if (saved) {
      const parsed = JSON.parse(saved) as Post[];
      const sorted = parsed.sort((a, b) => b.id - a.id).slice(0, 3);
      setRecentPosts(sorted);
    }
  }, []);

  const handleClick = () => {
    // ✅ 클라이언트 라우팅 대신 전체 페이지 새로고침
    window.location.href = "/community";
  };

  return (
    <div className="flex flex-col gap-2 text-sm text-gray-700 min-w-[500px] mb-10">
      {recentPosts.length === 0 ? (
        <div onClick={handleClick}>
          게시글이 없어요! 새로운 게시글을 만들어 보세요!
        </div>
      ) : (
        recentPosts.map((post) => (
          <div
            key={post.id}
            onClick={handleClick}
            className="bg-gray-200/60 rounded p-3 shadow cursor-pointer 
                   hover:bg-gray-300/70 transition-colors duration-200"
          >
            <div className="font-semibold">{post.title}</div>
            <div className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </div>
            <div>{post.content}</div>
          </div>
        ))
      )}
    </div>
  );
}
