import "./SectionPostList.css";

import PostCard from "/src/components/card/PostCard";

const SectionPostList = ({ posts }) => {
  return (
    <section className="section-postlist">
      {posts.map((post, idx) => (
        <PostCard key={post.seq} post={post} idx={idx} />
      ))}
    </section>
  );
};

export default SectionPostList;
