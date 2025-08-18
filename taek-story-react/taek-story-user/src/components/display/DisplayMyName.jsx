import { useSelector } from "react-redux";
import { selectUser } from "/src/store/sessionSlice.js";
import { Avatar } from "flowbite-react";
import { makeMyProfileSrc } from "../../util/common.js";

const DisplayMyName = () => {
  const user = useSelector(selectUser);
  const nickname = user?.nickname || "Guest";
  return (
    <div className="flex">
      <Avatar
        img={makeMyProfileSrc(user)}
        alt={"나의 프로필 이미지"}
        rounded
        class="mr-2"
      />
      <div className="flex items-center">{nickname}</div>
    </div>
  );
};

export default DisplayMyName;
