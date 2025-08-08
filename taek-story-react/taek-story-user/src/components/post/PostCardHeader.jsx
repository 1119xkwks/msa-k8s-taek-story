import "./PostCardHeader.css";
import { Avatar } from "flowbite-react";

const PostCardHeader = () => {
  return (
    <div className="post-card-header">
      <Avatar
        className="poster-avatar"
        img="https://i.pravatar.cc/40"
        alt="User avatar"
        rounded
      />
      <div className="poster-wrap">
        <div className="poster-name">제미나이</div>
        <div className="posted-info">2 days ago</div>
      </div>
    </div>
  );
};

export default PostCardHeader;
