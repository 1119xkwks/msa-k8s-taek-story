import "./SectionPosting.css";
import { Button, Avatar, Textarea } from "flowbite-react";
import { useEffect, useMemo, useRef, useState } from "react";
import MyCard from "../layout/MyCard.jsx";
import MyDivider from "../layout/MyDivider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faImage, faSmile } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectFeelings } from "../../store/feelingsSlice.js";
import PostingVideoPanel from "../post/posting/action/PostingVideoPanel.jsx";
import PostingPhotoPanel from "../post/posting/action/PostingPhotoPanel.jsx";
import PostingFeelingPanel from "../post/posting/action/PostingFeelingPanel.jsx";

const SectionPosting = () => {
  const [postingText, setPostingText] = useState("");
  const [textareaRows, setTextareaRows] = useState(1); // 기본 rows 1
  const [activeAction, setActiveAction] = useState(null); // 'video' | 'photo' | 'feeling' | null
  const [videoFile, setVideoFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const prevActionRef = useRef(null);

  const handlePost = () => {
    setPostingText("");
  };

  const handleToggle = (key) => {
    setActiveAction((prev) => (prev === key ? null : key));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files || []);
    setPhotoFiles(files);
  };

  const photoPreviews = useMemo(
    () => photoFiles.map((f) => ({ file: f, url: URL.createObjectURL(f) })),
    [photoFiles],
  );

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
      if (prev === "photo") setPhotoFiles([]);
      if (prev === "feeling") setSelectedFeeling(null);
    }
    prevActionRef.current = activeAction;
  }, [activeAction]);

  const FEELINGS = useSelector(selectFeelings);

  return (
    <section className="section-posting">
      <MyCard className="section-posting-card">
        <div className="section-posting-card-main">
          <Avatar img="https://i.pravatar.cc/40" alt="User avatar" rounded />
          <textarea
            className="textarea-posting"
            placeholder="What's on your mind?"
            value={postingText}
            onChange={(e) => setPostingText(e.target.value)}
            rows={textareaRows}
            onFocus={() => setTextareaRows(3)} // focus 시 rows=3
            onBlur={() => !postingText && setTextareaRows(1)} // focus 해제 시 비어있으면 rows=1
          />
          <Button
            className="posting-button"
            color="blue"
            onClick={handlePost}
            disabled={!postingText.trim()}
          >
            Post
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
            className={`action-item photo ${activeAction === "photo" ? "is-active" : ""}`}
            role="button"
            tabIndex={0}
            aria-label="Photo"
            onClick={() => handleToggle("photo")}
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

        {activeAction === "photo" && (
          <PostingPhotoPanel
            photoFiles={photoFiles}
            photoPreviews={photoPreviews}
            onChoose={handlePhotoChange}
            onClear={() => setPhotoFiles([])}
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
