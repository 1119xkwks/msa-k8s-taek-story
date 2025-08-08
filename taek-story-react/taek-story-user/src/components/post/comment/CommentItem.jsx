import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faReply,
  faEllipsis,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "flowbite-react";
import { formatRelativeTime } from "/src/util/common.js";
import ReplyItem from "./ReplyItem.jsx";
import ReplyEditor from "./ReplyEditor.jsx";

const CommentItem = ({ comment, depth }) => {
  const [showAllReplies, setShowAllReplies] = useState(true);
  const [isReplying, setIsReplying] = useState(false);

  const timeAgo = useMemo(
    () => formatRelativeTime(comment.createdAt),
    [comment.createdAt],
  );

  return (
    <div className="comment-item">
      <Avatar
        img={
          comment.author?.avatarUrl ||
          `https://i.pravatar.cc/40?u=${comment.author?.name || comment.id}`
        }
        alt={`${comment.author?.name || "User"} avatar`}
        rounded
      />

      <div className="flex-1 min-w-0">
        <div className="comment-bubble">
          <div className="author">{comment.author?.name || "익명"}</div>
          <div className="content">{comment.content}</div>
        </div>

        <div className="comment-meta">
          <button type="button" className="meta-button" aria-label="좋아요">
            <FontAwesomeIcon icon={faThumbsUp} className="text-gray-500" />
            좋아요{comment.likes ? ` ${comment.likes}` : ""}
          </button>
          <button
            type="button"
            className="meta-button"
            aria-label="답글 달기"
            onClick={() => setIsReplying((v) => !v)}
          >
            <FontAwesomeIcon icon={faReply} className="text-gray-500" />
            답글
          </button>
          <span aria-label="작성 시간" className="time">
            {timeAgo}
          </span>
          <button type="button" className="meta-more" aria-label="더보기">
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>

        {isReplying && <ReplyEditor setIsReplying={setIsReplying} />}

        {/* Replies */}
        {Array.isArray(comment.replies) && comment.replies.length > 0 && (
          <div className="reply-thread">
            <button
              type="button"
              className="reply-toggle"
              onClick={() => setShowAllReplies((v) => !v)}
              aria-expanded={showAllReplies}
            >
              <FontAwesomeIcon
                icon={showAllReplies ? faChevronUp : faChevronDown}
              />
              {showAllReplies
                ? "답글 숨기기"
                : `답글 보기 (${comment.replies.length})`}
            </button>

            {showAllReplies && (
              <ul role="list" className="replies">
                {comment.replies.map((reply) => (
                  <li key={reply.id}>
                    <ReplyItem reply={reply} depth={depth + 1} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
