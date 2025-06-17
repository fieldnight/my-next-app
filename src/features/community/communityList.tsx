"use client";
import { useState, useEffect } from "react";
import { Post, Comment } from "./types";
import CommunityForm from "./communityForm";
import CommunityDetail from "./communityDetail";

export default function CommunityList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const saved = localStorage.getItem("posts");
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleNewPost = (post: Omit<Post, "id" | "comments" | "createdAt">) => {
    const newPost: Post = {
      ...post,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setShowForm(false);
  };

  const handleAddComment = (postId: number, comment: Comment) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (selectedPost) {
    return (
      <CommunityDetail
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onAddComment={(comment: Comment) =>
          handleAddComment(selectedPost.id, comment)
        }
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 relative min-h-150">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="px-3 py-1 bg-white text-[#118079] border border-[#118079] rounded 
             hover:bg-[#dff4f2] hover:text-[#0b5f59] hover:border-[#0b5f59] transition-colors duration-200 "
        >
          새 글 작성하기
        </button>
      </div>

      <ul className="space-y-4">
        {currentPosts.length === 0 && (
          <div className="text-center text-gray-500">
            게시글이 없습니다. 새 글을 작성해보세요!
          </div>
        )}
        {currentPosts.map((post) => (
          <li
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="cursor-pointer bg-gray-100 p-4 rounded hover:bg-gray-200"
          >
            <div className="font-semibold">{post.nickname}</div>
            <div className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </div>
            <div className="mt-1 text-gray-800 font-bold">{post.title}</div>
            <div className="text-gray-700">{post.content}</div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-2 py-1 rounded ${
              currentPage === num
                ? "bg-[#349590] text-white"
                : "bg-[#b7dedb] hover:bg-[#466865] "
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <CommunityForm onSubmit={handleNewPost} />
          </div>
        </div>
      )}
    </div>
  );
}
