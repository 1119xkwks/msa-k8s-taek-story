import "./SectionPosting.css";
import { Button, Avatar, Textarea } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import MyCard from "../layout/MyCard.jsx";
import MyDivider from "../layout/MyDivider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faImage,
  faSmile,
  faFaceSmile,
  faFaceFrown,
  faFaceAngry,
  faFaceTired,
  faHeart,
  faFaceSurprise,
} from "@fortawesome/free-solid-svg-icons";

const SectionPosting = () => {
  const [postingText, setPostingText] = useState("");
  const [textareaRows, setTextareaRows] = useState(1); // 기본 rows 1
  const [activeAction, setActiveAction] = useState(null); // 'video' | 'photo' | 'feeling' | null
  const [videoFile, setVideoFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [selectedFeeling, setSelectedFeeling] = useState(null);

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

  const FEELINGS = [
    { id: "happy", label: "Happy", icon: faFaceSmile, color: "text-amber-500" },
    { id: "sad", label: "Sad", icon: faFaceFrown, color: "text-blue-600" },
    { id: "angry", label: "Angry", icon: faFaceAngry, color: "text-red-600" },
    { id: "tired", label: "Tired", icon: faFaceTired, color: "text-gray-600" },
    { id: "love", label: "In love", icon: faHeart, color: "text-pink-600" },
    {
      id: "surprised",
      label: "Surprised",
      icon: faFaceSurprise,
      color: "text-purple-600",
    },
  ];

  return (
    <section className="section-posting">
      <MyCard className="section-posting-card">
        <div className="section-posting-card-main">
          <Avatar img="https://i.pravatar.cc/40" alt="User avatar" rounded />
          <Textarea
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
          <div className="action-panel">
            <div className="file-row">
              <label className="file-label">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                />
                <span className="file-button">Choose video</span>
              </label>
              <span className="file-name">
                {videoFile?.name || "No file selected"}
              </span>
              <button
                type="button"
                className={`file-clear ${videoFile ? "" : "is-disabled"}`}
                onClick={() => setVideoFile(null)}
                disabled={!videoFile}
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {activeAction === "photo" && (
          <div className="action-panel">
            <div className="file-row">
              <label className="file-label">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                />
                <span className="file-button">Choose photos</span>
              </label>
              <span className="file-name">
                {photoFiles.length > 0
                  ? `${photoFiles.length} selected`
                  : "No files selected"}
              </span>
              <button
                type="button"
                className={`file-clear ${photoFiles.length ? "" : "is-disabled"}`}
                onClick={() => setPhotoFiles([])}
                disabled={photoFiles.length === 0}
              >
                Clear
              </button>
            </div>
            {photoPreviews.length > 0 && (
              <div className="thumb-grid" aria-label="selected photos preview">
                {photoPreviews.map((p, idx) => (
                  <img
                    key={idx}
                    src={p.url}
                    alt={`preview-${idx}`}
                    className="thumb"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeAction === "feeling" && (
          <div className="action-panel">
            <div className="feeling-grid">
              {FEELINGS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`feeling-item ${selectedFeeling === f.id ? "selected" : ""}`}
                  onClick={() => setSelectedFeeling((prev) => (prev === f.id ? null : f.id))}
                  aria-pressed={selectedFeeling === f.id}
                >
                  <FontAwesomeIcon
                    icon={f.icon}
                    className={`feeling-icon ${f.color}`}
                  />
                  <span className="feeling-label">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </MyCard>
    </section>
  );
};

export default SectionPosting;
