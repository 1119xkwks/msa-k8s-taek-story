import "./PostCard.css";
import MyCard from "/src/components/layout/MyCard";
import PostCardHeader from "/src/components/post/PostCardHeader.jsx";
import PostCardContent from "/src/components/post/PostCardContent.jsx";
import PostCardComment from "/src/components/post/PostCardComment.jsx";
import PostCardFooter from "/src/components/post/PostCardFooter.jsx";
import MyDivider from "../layout/MyDivider.jsx";

const PostCard = () => {
  return (
    <MyCard className="post-card">
      <PostCardHeader />
      <PostCardContent />
      <MyDivider className="my-1" />
      <PostCardComment />
      <PostCardFooter />
    </MyCard>
  );
};

export default PostCard;
