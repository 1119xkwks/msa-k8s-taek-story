import "./PostCardHeader.css";
import { Avatar } from "flowbite-react";
import { formatRelativeTime } from "/src/util/common.js";
import { API_BASE } from "/src/util/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

const PostCardHeader = ({ postedUser, crtDt, udtDt }) => {
  const { seq, email, nickname, fileProfileSeq } = postedUser;
  const isUpdated = udtDt > crtDt;
  const postedAt = isUpdated
    ? formatRelativeTime(udtDt)
    : formatRelativeTime(crtDt);

  return (
    <div className="post-card-header">
      {fileProfileSeq ? (
        <Avatar
          className="poster-avatar"
          img={`${API_BASE}/file-service/file/image/content/${fileProfileSeq}`}
          alt={`${nickname} 프로필 이미지`}
          rounded
        />
      ) : (
        <div className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center mr-2">
          <FontAwesomeIcon className="text-2xl" icon={faUserTie} />
        </div>
      )}

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
