import "./PostCardContent.css";
import { Carousel } from "flowbite-react";

const PostCardContent = () => {
  return (
    <div className="post-card-content ">
      <div className="attach hidden">
        <img
          className="image-single hidden"
          src="https://picsum.photos/800/600"
          alt="temp image"
        />
        <Carousel className="image-multi-carousel hidden" slide={false}>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="temp image"
          />
          <img src="https://picsum.photos/800/600" alt="temp image" />
          <img src="https://picsum.photos/600/600" alt="temp image" />
        </Carousel>
        <video
          className="video hidden"
          src="https://videos.pexels.com/video-files/27300968/12115023_2560_1440_30fps.mp4"
          controls
          autoPlay
          muted
          loop
          playsInline
        ></video>
      </div>
      <div className="content">content</div>
    </div>
  );
};

export default PostCardContent;
