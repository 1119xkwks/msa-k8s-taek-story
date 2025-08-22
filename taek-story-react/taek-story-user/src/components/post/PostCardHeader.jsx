import "./PostCardHeader.css";
import { Avatar } from "flowbite-react";
import { formatRelativeTime } from "/src/util/common.js";
import { API_BASE } from "/src/util/api.js";

const PostCardHeader = ({ postedUser, crtDt, udtDt }) => {
  const { seq, email, nickname, fileProfileSeq } = postedUser;
  const isUpdated = udtDt > crtDt;
  const postedAt = isUpdated
    ? formatRelativeTime(udtDt)
    : formatRelativeTime(crtDt);

  return (
    <div className="post-card-header">
      <Avatar
        className="poster-avatar"
        img={`${API_BASE}/file-service/file/image/content/${fileProfileSeq}`}
        alt={`${nickname} 프로필 이미지`}
        rounded
      />
      <div className="poster-wrap">
        <div className="poster-name">{nickname}</div>
        <div className="posted-info">
          {postedAt} {isUpdated ? "수정됨" : ""}
        </div>
      </div>
    </div>
  );
};

export default PostCardHeader;
