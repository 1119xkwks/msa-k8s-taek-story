import "./PostCardComment.css";

import { useMemo } from "react";
import CommentItem from "./comment/CommentItem.jsx";

const PostCardComment = ({ comments }) => {
  const sampleComments = useMemo(
    () => [
      {
        id: "c1",
        author: {
          name: "Alice",
          avatarUrl: "https://i.pravatar.cc/40?u=alice",
        },
        content: "오늘 날씨 정말 좋네요! 산책 가고 싶어요 ☀️",
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        likes: 3,
        replies: [
          {
            id: "c1-r1",
            author: {
              name: "Bob",
              avatarUrl: "https://i.pravatar.cc/40?u=bob",
            },
            content: "맞아요! 강아지랑 공원 다녀왔어요 🐶",
            createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
            likes: 1,
            replies: [
              /*
              {
                id: "c1-r1-r1",
                author: {
                  name: "Carol",
                  avatarUrl: "https://i.pravatar.cc/40?u=carol",
                },
                content: "부럽다! 사진도 보여줘요 📸",
                createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
                likes: 0,
                replies: [],
              },
              */
            ],
          },
          {
            id: "c1-r2",
            author: {
              name: "Dave",
              avatarUrl: "https://i.pravatar.cc/40?u=dave",
            },
            content: "저는 자전거 타고 왔습니다 🚴‍♂️",
            createdAt: new Date(Date.now() - 1000 * 60 * 9).toISOString(),
            likes: 0,
            replies: [],
          },
        ],
      },
      {
        id: "c2",
        author: { name: "Eve", avatarUrl: "https://i.pravatar.cc/40?u=eve" },
        content: "주말에 등산 갈 분 계신가요? ⛰️",
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        likes: 5,
        replies: [],
      },
    ],
    [],
  );

  const data = comments && comments.length > 0 ? comments : sampleComments;

  return (
    <div className="post-card-comment">
      <ul role="list" className="space-y-5">
        {data.map((comment) => (
          <li key={comment.id}>
            <CommentItem comment={comment} depth={0} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostCardComment;
