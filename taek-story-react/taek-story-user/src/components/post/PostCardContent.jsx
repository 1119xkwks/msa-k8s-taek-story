import "./PostCardContent.css";
import { Carousel } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceFrown,
  faFaceAngry,
  faFaceTired,
  faHeart,
  faFaceSurprise,
} from "@fortawesome/free-solid-svg-icons";

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

const PostCardContent = () => {
  return (
    <div className="post-card-content ">
      <div className="attach">
        {/*단일 이미지 전용*/}
        <img
          className="image-single hidden"
          src="https://picsum.photos/800/600"
          alt="temp image"
        />

        {/*다중 이미지 전용*/}
        <Carousel className="image-multi-carousel hidden" slide={false}>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="temp image"
          />
          <img src="https://picsum.photos/800/600" alt="temp image" />
          <img src="https://picsum.photos/600/600" alt="temp image" />
        </Carousel>

        {/*비디오 전용*/}
        <video
          className="video hidden"
          src="https://videos.pexels.com/video-files/27300968/12115023_2560_1440_30fps.mp4"
          controls
          autoPlay
          muted
          loop
          playsInline
        ></video>

        {/* Feeling 전용 표시 영역 (초기에는 hidden, feeling 선택 시 표시) */}
        <div className="feeling hidden" data-feeling="happy">
          <div className="feeling-badge">
            <FontAwesomeIcon
              icon={FEELINGS[0].icon}
              className={`feeling-icon ${FEELINGS[0].color}`}
            />
            <span className="feeling-text">Feeling {FEELINGS[0].label}</span>
          </div>
        </div>
      </div>
      <div className="content">content</div>
    </div>
  );
};

export default PostCardContent;
