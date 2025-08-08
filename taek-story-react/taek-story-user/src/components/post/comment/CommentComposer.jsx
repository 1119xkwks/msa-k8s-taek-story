import "./CommentComposer.css";
import { useState } from "react";
import { Avatar, Button, Textarea } from "flowbite-react";

const CommentComposer = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [rows, setRows] = useState(1);

  const handlePost = () => {
    const value = text.trim();
    if (!value) return;
    if (onSubmit) onSubmit(value);
    setText("");
    setRows(1);
  };

  return (
    <div className="comment-composer">
      <Avatar img="https://i.pravatar.cc/40?u=you" alt="Your avatar" rounded />
      <div className="composer-area">
        <Textarea
          className="composer-textarea"
          placeholder="Write a comment..."
          value={text}
          rows={rows}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setRows(3)}
          onBlur={() => !text && setRows(1)}
        />
        <div className="composer-actions">
          <Button
            className="commenting-button"
            size="xs"
            color="blue"
            onClick={handlePost}
            disabled={!text.trim()}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentComposer;
