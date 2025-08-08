import "./PostCardComment.css";

import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import CommentItem from "./comment/CommentItem.jsx";
// no direct UI imports needed here
import CommentComposer from "./comment/CommentComposer.jsx";

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
        createdAt: dayjs().subtract(15, "minute").format("YYYY-MM-DDTHH:mm:ss"),
        likes: 3,
        replies: [
          {
            id: "c1-r1",
            author: {
              name: "Bob",
              avatarUrl: "https://i.pravatar.cc/40?u=bob",
            },
            content: "맞아요! 강아지랑 공원 다녀왔어요 🐶",
            createdAt: dayjs()
              .subtract(10, "minute")
              .format("YYYY-MM-DDTHH:mm:ss"),
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
            createdAt: dayjs()
              .subtract(9, "minute")
              .format("YYYY-MM-DDTHH:mm:ss"),
            likes: 0,
            replies: [],
          },
        ],
      },
      {
        id: "c2",
        author: { name: "Eve", avatarUrl: "https://i.pravatar.cc/40?u=eve" },
        content: "주말에 등산 갈 분 계신가요? ⛰️",
        createdAt: dayjs().subtract(1, "hour").format("YYYY-MM-DDTHH:mm:ss"),
        likes: 5,
        replies: [],
      },
      {
        id: "c3",
        author: { name: "Eve", avatarUrl: "https://i.pravatar.cc/40?u=eve" },
        content: "3야호",
        createdAt: dayjs().subtract(1, "hour").format("YYYY-MM-DDTHH:mm:ss"),
        likes: 5,
        replies: [],
      },
      {
        id: "c4",
        author: { name: "xor", avatarUrl: "https://i.pravatar.cc/40?u=eve" },
        content: "4어디 갔다 왔어?",
        createdAt: dayjs().subtract(1, "hour").format("YYYY-MM-DDTHH:mm:ss"),
        likes: 5,
        replies: [],
      },
      {
        id: "c5",
        author: { name: "Eve", avatarUrl: "https://i.pravatar.cc/40?u=eve" },
        content: "5주말에 등산 갈 분 계신가요? ⛰️",
        createdAt: dayjs().subtract(1, "hour").format("YYYY-MM-DDTHH:mm:ss"),
        likes: 5,
        replies: [],
      },
      {
        id: "c6",
        author: { name: "Eve", avatarUrl: "https://i.pravatar.cc/40?u=eve" },
        content: "6야호",
        createdAt: dayjs().subtract(1, "hour").format("YYYY-MM-DDTHH:mm:ss"),
        likes: 5,
        replies: [],
      },
      {
        id: "c7",
        author: { name: "xor", avatarUrl: "https://i.pravatar.cc/40?u=eve" },
        content: "7어디 갔다 왔어?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        likes: 5,
        replies: [],
      },
    ],
    [],
  );

  const initialComments =
    comments && comments.length > 0 ? comments : sampleComments;
  const [allComments, setAllComments] = useState(initialComments);
  useEffect(() => {
    setAllComments(comments && comments.length > 0 ? comments : sampleComments);
  }, [comments, sampleComments]);

  const hasToggle = allComments.length >= 3;
  const [expanded, setExpanded] = useState(!hasToggle);

  const visibleComments = useMemo(
    () => (expanded ? allComments : allComments.slice(0, 3)),
    [expanded, allComments],
  );

  const handleAddComment = (value) => {
    const newComment = {
      id: `new-${Date.now()}`,
      author: { name: "You", avatarUrl: "https://i.pravatar.cc/40?u=you" },
      content: value,
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      likes: 0,
      replies: [],
    };
    setAllComments((prev) => [newComment, ...prev]);
    setExpanded(true);
  };

  return (
    <div className="post-card-comment">
      {/* Comment composer */}
      <CommentComposer onSubmit={handleAddComment} />

      <ul role="list" className="space-y-5">
        {visibleComments.map((comment) => (
          <li key={comment.id}>
            <CommentItem comment={comment} depth={0} />
          </li>
        ))}
      </ul>
      {hasToggle && (
        <div className="see-more-wrap">
          <button
            type="button"
            className="see-more-btn"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded
              ? "Hide comments"
              : `See more comments (${allComments.length - 3})`}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCardComment;
