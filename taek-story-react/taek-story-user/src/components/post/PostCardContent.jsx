import "./PostCardContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { selectFeelings } from "/src/store/feelingsSlice.js";
import { feelingIdToIcon } from "/src/icons/feelingIcons.js";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import {
  API_BASE,
  VITE_MINIO_PUBLIC_API_BASE,
  apiFetch,
} from "/src/util/api.js";

const PostCardContent = ({
  contents,
  contentsType,
  contentsFileSeq,
  selectedFeeling,
}) => {
  const FEELINGS = useSelector(selectFeelings);

  // 감정 선택
  const [feelingData, setFeelingData] = useState(null);
  useEffect(() => {
    if ("feeling" === contentsType && selectedFeeling && FEELINGS?.length) {
      setFeelingData(FEELINGS.filter((x) => x.id === selectedFeeling)?.[0]);
    }
  }, [selectedFeeling]);

  // 비디오 URL
  const [videoPresignedURL, setVideoPresignedURL] = useState("");
  useEffect(() => {
    if ("video" === contentsType && contentsFileSeq) {
      (async () => {
        try {
          /*
          const res = await apiFetch(
            `${API_BASE}/file-service/file/video/presigned/uri/${contentsFileSeq}`,
            {
              method: "GET",
            },
          );
          if (!res.ok) {
            await $alert("처리도중 에러가 발생하였습니다.");
            return;
          }
          const result = await res.text();
          const url = new URL(result);
          const uriFull =
            VITE_MINIO_PUBLIC_API_BASE + url.pathname + url.search + url.hash;
          //console.log("uriFull", uriFull);
          // setVideoPresignedURL(uriFull);
          */
          setVideoPresignedURL(
            `${API_BASE}/file-service/file/video/stream/${contentsFileSeq}`,
          );
        } catch (_e) {
          console.error(_e);
          setVideoPresignedURL("");
          return;
        }
      })();
    }
  }, [contentsFileSeq]);

  // 컨텐츠 내용을 HTML로 변환
  const [cleanedContents, setCleanedContents] = useState("");
  useEffect(() => {
    if (contents) {
      setCleanedContents(
        DOMPurify.sanitize(
          marked.parse(contents, {
            gfm: true,
            breaks: true,
          }),
        ),
      );
    }
  }, [contents]);

  return (
    <div className="post-card-content ">
      <div className="attach">
        {
          /*단일 이미지 전용*/
          "image" === contentsType ? (
            <img
              className="image-single"
              src={`${API_BASE}/file-service/file/image/content/${contentsFileSeq}`}
              alt="콘텐츠 이미지"
            />
          ) : (
            ""
          )
        }

        {
          /*비디오 전용*/ "video" === contentsType && videoPresignedURL ? (
            <video
              className="video"
              src={`${videoPresignedURL}`}
              controls
              autoPlay
              muted
              loop
              playsInline
            ></video>
          ) : (
            ""
          )
        }

        {
          /* Feeling 전용 표시 영역 */ "feeling" === contentsType &&
          feelingData ? (
            <div className="feeling" data-feeling="happy">
              <div className="feeling-badge">
                <FontAwesomeIcon
                  icon={feelingIdToIcon[feelingData.id]}
                  className={`feeling-icon ${feelingData.color}`}
                />
                <span className="feeling-text">
                  Feeling {feelingData.label}
                </span>
              </div>
            </div>
          ) : (
            ""
          )
        }
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: cleanedContents,
        }}
      ></div>
    </div>
  );
};

export default PostCardContent;
