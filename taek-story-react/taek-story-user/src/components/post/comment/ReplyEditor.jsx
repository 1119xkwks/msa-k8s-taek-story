import { useState } from "react";
import { Button, Textarea } from "flowbite-react";

const ReplyEditor = ({ setIsReplying }) => {
  const [replyValue, setReplyValue] = useState("");
  const [replyRows, setReplyRows] = useState(1);
  return (
    <div className="reply-editor">
      <Textarea
        rows={replyRows}
        placeholder="답글을 입력하세요..."
        value={replyValue}
        onChange={(e) => setReplyValue(e.target.value)}
        onFocus={() => setReplyRows(3)}
        onBlur={() => setReplyRows(1)}
      />
      <div className="reply-actions">
        <Button
          color="light"
          size="xs"
          onClick={() => {
            setIsReplying(false);
            setReplyValue("");
            setReplyRows(1);
          }}
        >
          취소
        </Button>
        <Button
          color="blue"
          size="xs"
          onClick={() => {
            // TODO: 제출 핸들러 연결
            setIsReplying(false);
            setReplyValue("");
            setReplyRows(1);
          }}
        >
          등록
        </Button>
      </div>
    </div>
  );
};

export default ReplyEditor;
