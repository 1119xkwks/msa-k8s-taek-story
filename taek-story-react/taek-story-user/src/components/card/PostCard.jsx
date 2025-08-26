import "./PostCard.css";
import MyCard from "/src/components/layout/MyCard";
import PostCardHeader from "/src/components/post/PostCardHeader.jsx";
import PostCardContent from "/src/components/post/PostCardContent.jsx";
import PostCardFooter from "/src/components/post/PostCardFooter.jsx";
import { useEffect, useState } from "react";
import { apiFetch } from "../../util/api.js";
import { $alert } from "../../util/modals.js";

const PostCard = ({ post, idx }) => {
  const {
    seq,
    userSeq,
    contents,
    contentsType,
    contentsFileSeq,
    selectedFeeling,
    crtDt,
    udtDt,
  } = post;

  // 글쓴이 정보
  const [postedUser, setPostedUser] = useState({});
  const selectPostedUserInfo = async () => {
    try {
      const res = await apiFetch(`/user-service/users/basic-info/${userSeq}`, {
        method: "GET",
      });
      if (!res.ok) {
        await $alert("처리도중 에러가 발생하였습니다.");
        setPostedUser({});
        return;
      }
      const result = await res.json();
      setPostedUser(result);
    } catch (_e) {
      console.error(_e);
      setPostedUser({});
      return;
    }
  };

  // 최초 마운트 또는 userSeq 변경 시 사용자 정보 조회
  useEffect(() => {
    if (userSeq) {
      (async () => {
        await selectPostedUserInfo();
      })();
    }
  }, [userSeq]);

  return (
    <MyCard className="post-card">
      <PostCardHeader postedUser={postedUser} crtDt={crtDt} udtDt={udtDt} />
      <PostCardContent
        contents={contents}
        contentsType={contentsType}
        contentsFileSeq={contentsFileSeq}
        selectedFeeling={selectedFeeling}
      />
      {/*<MyDivider className="my-1" />*/}
      {/*<PostCardComment />*/}
      <PostCardFooter />
    </MyCard>
  );
};

export default PostCard;
