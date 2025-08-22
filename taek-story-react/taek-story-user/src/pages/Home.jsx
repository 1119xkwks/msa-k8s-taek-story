import "./Home.css";

import Header from "../components/Header.jsx";
import AnchorHome from "../components/anchor/AnchorHome.jsx";
import DisplayMyName from "../components/display/DisplayMyName.jsx";
import AnchorSetting from "../components/anchor/AnchorSetting.jsx";
import RightMenuDrawer from "../components/drawer/RightMenuDrawer.jsx";
import SectionPosting from "../components/section/SectionPosting";
import SectionPostList from "../components/section/SectionPostList";

import { createContext, useEffect, useState } from "react";
import { apiFetch } from "../util/api.js";
import { $alert } from "../util/modals.js";

export const PostingDataContext = createContext();
export const PostingDispatchContext = createContext();

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Posting states
  const [isSendPosting, setIsSendingPosting] = useState(false);
  const [postingText, setPostingText] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const [activeAction, setActiveAction] = useState(null); // 'video' | 'image' | 'feeling' | null
  const [videoFile, setVideoFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  // Posts states
  const [isSelectingPosts, setIsSelectingPosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [pagePosts, setPagePosts] = useState(1);

  /**
   * 포스팅 글 올리기 핸들러는 상위 컨텍스트에서 제공
   * @returns {Promise<void>}
   */
  const postingHandler = async () => {
    if (!postingText || isSendPosting) {
      return;
    }

    try {
      setIsSendingPosting(true);
      const form = new FormData();

      let finalAction = "NONE";
      switch (activeAction) {
        case "video":
          if (videoFile) {
            if (videoFile.size > 200 * 1024 * 1024) {
              await $alert("200MB를 초과할 수 없습니다.");
              return;
            }
            finalAction = "video";
            form.append("file", videoFile);
          }
          break;
        case "image":
          if (photoFile) {
            if (photoFile.size > 200 * 1024 * 1024) {
              await $alert("200MB를 초과할 수 없습니다.");
              return;
            }
            finalAction = "image";
            form.append("file", photoFile);
          }
          break;
        case "feeling":
          if (selectedFeeling) {
            finalAction = "feeling";
            form.append("selectedFeeling", selectedFeeling);
          }
          break;
        default:
          finalAction = "NONE";
      }

      form.append("activeAction", finalAction);
      form.append("contents", postingText);

      const res = await apiFetch(`/posting-service/posting/save`, {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        await $alert("처리도중 에러가 발생하였습니다.");
        return;
      }
      const result = await res.json();
      if (result) {
        //
        console.debug("[postingHandler] result", result);
      }
    } catch (_e) {
      console.error(_e);
    } finally {
      setIsSendingPosting(false);
    }

    await $alert("등록되었습니다.");

    // 작성 내용 초기화
    setPostingText("");
    setTextareaRows(1);
    setActiveAction(null);
    setVideoFile(null);
    setPhotoFile(null);
    setSelectedFeeling(null);

    // 목록 1페이지부터 다시 조회
    await selectPosts(1);
  };

  /**
   * 포스팅 글 불러오기
   * @returns {Promise<void>}
   */
  const selectPosts = async (paging) => {
    if (isSelectingPosts) {
      return;
    }
    try {
      setIsSelectingPosts(true);

      if (paging) {
        setPagePosts(paging);
      }

      const res = await apiFetch(
        `/posting-service/posting/list?page=${pagePosts}&size=10`,
        {
          method: "GET",
        },
      );
      if (!res.ok) {
        await $alert("처리도중 에러가 발생하였습니다.");
        return;
      }
      const result = await res.json();
      if (result) {
        //
        console.debug("[selectPosts] result", result);

        setPosts(result?.content || []);
      }
    } catch (_e) {
      console.error(_e);
    } finally {
      setIsSelectingPosts(false);
    }
  };

  useEffect(() => {
    selectPosts();
  }, []);

  return (
    <div className="home">
      {/*헤더*/}
      <Header
        left={<AnchorHome />}
        center={<DisplayMyName />}
        right={<AnchorSetting clickHandler={() => setIsMenuOpen(true)} />}
      />

      <PostingDataContext.Provider
        value={{
          isSendPosting,
          postingText,
          textareaRows,
          activeAction,
          videoFile,
          photoFile,
          selectedFeeling,
        }}
      >
        <PostingDispatchContext.Provider
          value={{
            setPostingText,
            setTextareaRows,
            setActiveAction,
            setVideoFile,
            setPhotoFile,
            setSelectedFeeling,
            postingHandler,
          }}
        >
          {/*글쓰기*/}
          <SectionPosting />

          {/*글목록*/}
          <SectionPostList posts={posts} />
        </PostingDispatchContext.Provider>
      </PostingDataContext.Provider>

      {/*사이드바*/}
      <RightMenuDrawer
        isMenuOpen={isMenuOpen}
        menuCloseHandler={() => setIsMenuOpen(false)}
      />
    </div>
  );
};

export default Home;
