import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostingFeelingPanel = ({ feelings, selectedFeeling, onSelect }) => {
  return (
    <div className="action-panel">
      <div className="feeling-grid">
        {feelings.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`feeling-item ${selectedFeeling === f.id ? "selected" : ""}`}
            onClick={() => onSelect(f.id)}
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
  );
};

export default PostingFeelingPanel;
