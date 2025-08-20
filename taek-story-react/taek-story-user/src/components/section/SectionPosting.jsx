import "./SectionPosting.css";
import { Button, Avatar, Textarea } from "flowbite-react";
import { useContext, useEffect, useMemo, useRef } from "react";
import MyCard from "/src/components/layout/MyCard.jsx";
import MyDivider from "/src/components/layout/MyDivider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faImage,
  faSmile,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectFeelings } from "/src/store/feelingsSlice.js";
import PostingVideoPanel from "/src/components/post/posting/action/PostingVideoPanel.jsx";
import PostingPhotoPanel from "/src/components/post/posting/action/PostingPhotoPanel.jsx";
import PostingFeelingPanel from "/src/components/post/posting/action/PostingFeelingPanel.jsx";
import { selectIsAuthenticated, selectUser } from "../../store/sessionSlice.js";
import { makeMyProfileSrc } from "../../util/common.js";
import {
  PostingDataContext,
  PostingDispatchContext,
} from "/src/pages/Home.jsx";

const SectionPosting = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const {
    isSendPosting,
    postingText,
    textareaRows,
    activeAction,
    videoFile,
    photoFile,
    selectedFeeling,
  } = useContext(PostingDataContext);
  const {
    setPostingText,
    setTextareaRows,
    setActiveAction,
    setVideoFile,
    setPhotoFile,
    setSelectedFeeling,
    postingHandler,
  } = useContext(PostingDispatchContext);
  const prevActionRef = useRef(null);

  const handleToggle = (key) => {
    if (!isAuthenticated) {
      setActiveAction(null);
      return;
    }
    setActiveAction((prev) => (prev === key ? null : key));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
  };

  const photoPreviews = useMemo(() => {
    if (!photoFile) return [];
    return [{ file: photoFile, url: URL.createObjectURL(photoFile) }];
  }, [photoFile]);

  useEffect(() => {
    return () => {
      photoPreviews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [photoPreviews]);

  // 패널 전환 시 상태 초기화 (닫히는 순간 clear)
  useEffect(() => {
    const prev = prevActionRef.current;
    if (prev && prev !== activeAction) {
      if (prev === "video") setVideoFile(null);
      if (prev === "image") setPhotoFile(null);
      if (prev === "feeling") setSelectedFeeling(null);
    }
    prevActionRef.current = activeAction;
  }, [activeAction]);

  const FEELINGS = useSelector(selectFeelings);

  return (
    <section className="section-posting">
      <MyCard className="section-posting-card">
        <div className="section-posting-card-main">
          {user?.fileProfileSeq ? (
            <Avatar
              img={makeMyProfileSrc(user)}
              alt={"나의 프로필 이미지"}
              rounded
              className="mr-2"
            />
          ) : (
            <div className="rounded-full bg-gray-300 w-14 h-10 flex items-center justify-center mr-2">
              <FontAwesomeIcon className="text-2xl" icon={faUserTie} />
            </div>
          )}
          <textarea
            className="textarea-posting"
            placeholder={
              isAuthenticated ? "What's on your mind?" : "로그인 후 사용 가능"
            }
            value={postingText}
            onChange={(e) => setPostingText(e.target.value)}
            rows={textareaRows}
            onFocus={() => setTextareaRows(3)} // focus 시 rows=3
            onBlur={() => !postingText && setTextareaRows(1)} // focus 해제 시 비어있으면 rows=1
            disabled={!isAuthenticated}
          />
          <Button
            className="posting-button"
            color="blue"
            onClick={postingHandler}
            disabled={isSendPosting || !postingText.trim()}
          >
            {isSendPosting ? "Posting.." : "Post"}
          </Button>
        </div>

        <MyDivider className="my-1" />

        <div
          className="section-posting-actions"
          role="group"
          aria-label="posting actions"
        >
          <div
            className={`action-item video ${activeAction === "video" ? "is-active" : ""}`}
            role="button"
            tabIndex={0}
            aria-label="Live video"
            onClick={() => handleToggle("video")}
          >
            <FontAwesomeIcon className="action-icon" icon={faVideo} />
            <span className="action-label">Video</span>
          </div>

          <div
            className={`action-item photo ${activeAction === "image" ? "is-active" : ""}`}
            role="button"
            tabIndex={0}
            aria-label="Photo"
            onClick={() => handleToggle("image")}
          >
            <FontAwesomeIcon className="action-icon" icon={faImage} />
            <span className="action-label">Photo</span>
          </div>

          <div
            className={`action-item feeling ${activeAction === "feeling" ? "is-active" : ""}`}
            role="button"
            tabIndex={0}
            aria-label="Feeling or activity"
            onClick={() => handleToggle("feeling")}
          >
            <FontAwesomeIcon className="action-icon" icon={faSmile} />
            <span className="action-label">Feeling</span>
          </div>
        </div>

        {activeAction === "video" && (
          <PostingVideoPanel
            videoFile={videoFile}
            onChoose={handleVideoChange}
            onClear={() => setVideoFile(null)}
          />
        )}

        {activeAction === "image" && (
          <PostingPhotoPanel
            photoFiles={photoFile ? [photoFile] : []}
            photoPreviews={photoPreviews}
            onChoose={handlePhotoChange}
            onClear={() => setPhotoFile(null)}
          />
        )}

        {activeAction === "feeling" && (
          <PostingFeelingPanel
            feelings={FEELINGS}
            selectedFeeling={selectedFeeling}
            onSelect={(id) =>
              setSelectedFeeling((prev) => (prev === id ? null : id))
            }
          />
        )}
      </MyCard>
    </section>
  );
};

export default SectionPosting;
