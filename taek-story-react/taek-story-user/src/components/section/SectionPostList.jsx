import "./SectionPostList.css";

import PostCard from "/src/components/card/PostCard";
import { useEffect, useRef } from "react";
import { Button, Spinner } from "flowbite-react";

const SectionPostList = ({
  posts,
  selectPosts,
  isSelectingPosts,
  pagePosts,
  isLastPosts,
}) => {
  const sentinelRef = useRef(null);
  const hasIgnoredInitialIntersectRef = useRef(false);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
          if (!hasIgnoredInitialIntersectRef.current) {
            // Ignore the very first intersect event after mount to avoid auto-loading page 2 on initial render
            hasIgnoredInitialIntersectRef.current = true;
            return;
          }
          if (!isSelectingPosts && !isLastPosts) {
            selectPosts((pagePosts || 1) + 1);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.8, 1],
      },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [isSelectingPosts, isLastPosts, pagePosts, selectPosts]);

  return (
    <section className="section-postlist">
      {posts.map((post, idx) => (
        <PostCard key={post.seq} post={post} idx={idx} />
      ))}

      {/* Sentinel for IntersectionObserver */}
      {!isLastPosts && (
        <div ref={sentinelRef} className="section-postlist__sentinel" />
      )}

      {/* Status messages */}
      {isSelectingPosts && (
        <div className="section-postlist__status">
          <Button className="w-full" color="alternative">
            <Spinner color="success" aria-label="Loading..." size="md" />
            <span className="pl-3">Loading...</span>
          </Button>
        </div>
      )}
      {isLastPosts && (
        <div className="section-postlist__status">
          <div className="section-postlist__end">
            더 이상 포스트가 없습니다.
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionPostList;
