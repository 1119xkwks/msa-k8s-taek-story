const PostingVideoPanel = ({ videoFile, onChoose, onClear }) => {
  return (
    <div className="action-panel">
      <div className="file-row">
        <label className="file-label">
          <input type="file" accept="video/*" onChange={onChoose} />
          <span className="file-button">Choose video</span>
        </label>
        <span className="file-name">
          {videoFile?.name || "No file selected"}
        </span>
        <button
          type="button"
          className={`file-clear ${videoFile ? "" : "is-disabled"}`}
          onClick={onClear}
          disabled={!videoFile}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default PostingVideoPanel;
