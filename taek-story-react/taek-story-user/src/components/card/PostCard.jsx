import "./PostCard.css";
import MyCard from "/src/components/layout/MyCard";
import { Avatar } from "flowbite-react";

const PostCard = () => {
  return (
    <MyCard className="post-card">
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
      <div className="post-card-content">
        <div className="post-card-image-area">post-card-image-area</div>
        <div className="post-card-text">post-card-text</div>
      </div>
      <div className="post-card-comment">post-card-comment</div>
      <div className="post-card-footer">post-card-footer</div>
    </MyCard>
  );
};

export default PostCard;
