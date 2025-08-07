import "./Home.css";

import Header from "../components/Header.jsx";
import AnchorHome from "../components/anchor/AnchorHome.jsx";
import DisplayMyName from "../components/display/DisplayMyName.jsx";
import AnchorSetting from "../components/anchor/AnchorSetting.jsx";
import RightMenuDrawer from "../components/drawer/RightMenuDrawer.jsx";
import SectionPosting from "../components/section/SectionPosting";
import SectionPostList from "../components/section/SectionPostList";

import { useState } from "react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="home">
      {/*헤더*/}
      <Header
        left={<AnchorHome />}
        center={<DisplayMyName />}
        right={<AnchorSetting clickHandler={() => setIsMenuOpen(true)} />}
      />

      {/*글쓰기*/}
      <SectionPosting />

      {/*글목록*/}
      <SectionPostList />

      {/*사이드바*/}
      <RightMenuDrawer
        isMenuOpen={isMenuOpen}
        menuCloseHandler={() => setIsMenuOpen(false)}
      />
    </div>
  );
};

export default Home;
