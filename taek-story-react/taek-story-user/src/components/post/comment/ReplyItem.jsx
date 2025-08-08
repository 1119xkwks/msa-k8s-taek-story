import { useMemo } from "react";
import { Avatar, Badge } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faReply } from "@fortawesome/free-solid-svg-icons";
import { formatRelativeTime } from "/src/util/common.js";

const ReplyItem = ({ reply, depth }) => {
  const timeAgo = useMemo(
    () => formatRelativeTime(reply.createdAt),
    [reply.createdAt],
  );

  return (
    <div className="comment-item">
      <Avatar
        img={
          reply.author?.avatarUrl ||
          `https://i.pravatar.cc/40?u=${reply.author?.name || reply.id}`
        }
        alt={`${reply.author?.name || "User"} avatar`}
        rounded
      />

      <div className="flex-1 min-w-0">
        <div className="comment-bubble">
          <div className="author">{reply.author?.name || "익명"}</div>
          <div className="content">{reply.content}</div>
        </div>

        <div className="comment-meta">
          <button type="button" className="meta-button" aria-label="좋아요">
            <FontAwesomeIcon icon={faThumbsUp} className="text-gray-500" />
            좋아요{reply.likes ? ` ${reply.likes}` : ""}
          </button>
          <span aria-label="작성 시간" className="time">
            {timeAgo}
          </span>
        </div>

        {Array.isArray(reply.replies) && reply.replies.length > 0 && (
          <div className="mt-2 ml-12 space-y-2">
            {reply.replies.map((child) => (
              <ReplyItem key={child.id} reply={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplyItem;
