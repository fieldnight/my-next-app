import { Comment } from "./types";

interface Props {
  comments: Comment[];
}

export default function CommentSection({ comments }: Props) {
  return (
    <div className="space-y-2">
      {comments.map((c, i) => (
        <div key={i} className="bg-gray-50 p-2 rounded border">
          <div className="text-sm font-semibold">{c.nickname}</div>
          <div className="text-xs text-gray-500">
            {new Date(c.createdAt).toLocaleString()}
          </div>
          <div className="text-sm text-gray-700">{c.text}</div>
        </div>
      ))}
    </div>
  );
}
