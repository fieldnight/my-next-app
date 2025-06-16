"use client";

import { useState, useEffect, FormEvent } from "react";
import CommentSection from "./commentSection";
import { Post, Comment } from "./types"; // ✅ 타입 import

interface Props {
  post: Post;
  onBack: () => void;
  onAddComment: (comment: Comment) => void;
}

export default function CommunityDetail({ post, onBack, onAddComment }: Props) {
  const [nickname, setNickname] = useState<string>("익명");
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState<Comment[]>(post.comments); // ✅ 초기 댓글 상태

  useEffect(() => {
    const nick = localStorage.getItem("nickname");
    if (nick) setNickname(nick);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment: Comment = {
      nickname: nickname || "익명",
      text: commentText,
      createdAt: new Date().toISOString(),
    };
    onAddComment(newComment); // 부모에게 전달
    setLocalComments([...localComments, newComment]); // 로컬 상태 업데이트
    setCommentText("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">
        ← 뒤로가기
      </button>

      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="text-lg font-bold">{post.title}</div>
        <div className="text-sm text-gray-500 mb-2">
          {new Date(post.createdAt).toLocaleString()}
        </div>
        <div className="text-sm text-gray-700 mb-1">
          작성자: {post.nickname}
        </div>
        <div className="mt-2 text-gray-800">{post.content}</div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full border p-2 rounded"
          placeholder="댓글을 입력하세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 bg-[#528d88] text-white px-4 py-2 rounded hover:bg-[#34716c]"
        >
          댓글 달기
        </button>
      </form>

      <CommentSection comments={localComments} />
    </div>
  );
}
