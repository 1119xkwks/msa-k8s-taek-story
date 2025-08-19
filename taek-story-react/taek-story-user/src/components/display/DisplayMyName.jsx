import { useSelector } from "react-redux";
import { selectUser } from "/src/store/sessionSlice.js";
import { Avatar } from "flowbite-react";
import { makeMyProfileSrc } from "/src/util/common.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

const DisplayMyName = () => {
  const user = useSelector(selectUser);
  const nickname = user?.nickname || "Guest";
  return (
    <div className="flex">
      {user?.fileProfileSeq ? (
        <Avatar
          img={makeMyProfileSrc(user)}
          alt={"나의 프로필 이미지"}
          rounded
          className="mr-2"
        />
      ) : (
        <div className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center mr-2">
          <FontAwesomeIcon className="text-2xl" icon={faUserTie} />
        </div>
      )}
      <div className="flex items-center">{nickname}</div>
    </div>
  );
};

export default DisplayMyName;
