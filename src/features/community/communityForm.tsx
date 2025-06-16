"use client";
import { useState, useEffect, FormEvent } from "react";
import { Post } from "./types";

interface Props {
  onSubmit: (post: Omit<Post, "id" | "comments">) => void;
}

export default function CommunityForm({ onSubmit }: Props) {
  const [nickname, setNickname] = useState<string>("익명");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const nick = localStorage.getItem("nickname");
    if (nick) setNickname(nick);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({
      nickname: nickname || "익명",
      title,
      content,
      createdAt: new Date().toISOString(),
    });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <div className="mb-2 text-gray-700 font-semibold">닉네임: {nickname}</div>
      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 rounded mb-2"
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        작성하기
      </button>
    </form>
  );
}
