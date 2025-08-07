import "./Home.css";

import Header from "../components/Header.jsx";
import AnchorHome from "../components/AnchorHome";
import RightMenuDrawer from "../components/RightMenuDrawer";
import AnchorSetting from "../components/AnchorSetting.jsx";

import { useState } from "react";
import DisplayMyName from "../components/DisplayMyName.jsx";

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

      {/*사이드바*/}
      <RightMenuDrawer
        isMenuOpen={isMenuOpen}
        menuCloseHandler={() => setIsMenuOpen(false)}
      />
    </div>
  );
};

export default Home;
