export interface Comment {
  nickname: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: number;
  nickname: string;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
}
