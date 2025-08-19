const PostingPhotoPanel = ({
  photoFiles,
  photoPreviews,
  onChoose,
  onClear,
}) => {
  return (
    <div className="action-panel">
      <div className="file-row">
        <label className="file-label">
          <input type="file" accept="image/jpeg" multiple onChange={onChoose} />
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
          onClick={onClear}
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
  );
};

export default PostingPhotoPanel;
