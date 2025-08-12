import { useSelector } from "react-redux";
import { selectUser } from "/src/store/sessionSlice.js";

const DisplayMyName = () => {
  const user = useSelector(selectUser);
  const nickname = user?.nickname || "Guest";
  return <div>{nickname}</div>;
};

export default DisplayMyName;
