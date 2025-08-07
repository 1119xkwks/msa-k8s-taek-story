import "./SectionPosting.css";
import { Button, Avatar, Textarea } from "flowbite-react";
import { useState } from "react";
import MyCard from "../layout/MyCard.jsx";

const SectionPosting = () => {
  const [postingText, setPostingText] = useState("");
  const [textareaRows, setTextareaRows] = useState(1); // 기본 rows 1

  const handlePost = () => {
    setPostingText("");
  };

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
            color="blue"
            onClick={handlePost}
            disabled={!postingText.trim()}
          >
            Post
          </Button>
        </div>
      </MyCard>
    </section>
  );
};

export default SectionPosting;
