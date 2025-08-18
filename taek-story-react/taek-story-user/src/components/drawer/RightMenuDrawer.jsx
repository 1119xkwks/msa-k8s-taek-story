import "./RightMenuDrawer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faUserPlus,
  faMagnifyingGlass,
  faArrowRightFromBracket,
  faHome,
  faBell,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

import {
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  TextInput,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectIsAuthenticated } from "/src/store/sessionSlice.js";
import { apiFetch } from "/src/util/api.js";
import { useNavigate } from "react-router-dom";

const RightMenuDrawer = ({ isMenuOpen, menuCloseHandler }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const onSignOut = async () => {
    console.log("onSignOut");
    const res = await apiFetch(`/user-service/users/signout`, {
      method: "GET",
    });
    if (res.ok) {
      const result = await res.json();
      if (result > 0) {
        dispatch(clearUser()); // 1) 클라이언트 세션 제거
        menuCloseHandler?.(); // 2) 선택: 드로어 닫기
        navigate("/login", { replace: true }); // 3) SPA 이동
      }
    }
  };

  return (
    <Drawer
      className="right-side-menu"
      open={isMenuOpen}
      onClose={menuCloseHandler}
      position="right"
    >
      <DrawerHeader title="MENU" titleIcon={() => <></>} />
      <DrawerItems>
        <Sidebar
          aria-label="Sidebar with multi-level dropdown example"
          className="[&>div]:bg-transparent [&>div]:p-0"
        >
          <div className="flex h-full flex-col justify-between py-2">
            <div>
              <form className="pb-3 md:hidden">
                <TextInput
                  type="search"
                  placeholder="탐색"
                  required
                  size={32}
                  icon={() => <FontAwesomeIcon icon={faMagnifyingGlass} />}
                />
              </form>
              <SidebarItems>
                <SidebarItemGroup>
                  <SidebarItem
                    href="/"
                    icon={() => <FontAwesomeIcon icon={faHome} />}
                  >
                    홈
                  </SidebarItem>
                  <SidebarItem
                    href="/notification"
                    icon={() => <FontAwesomeIcon icon={faBell} />}
                  >
                    알림
                  </SidebarItem>
                  {isAuthenticated ? (
                    <SidebarItem
                      href="/profile"
                      icon={() => <FontAwesomeIcon icon={faUserGear} />}
                    >
                      프로필 이미지
                    </SidebarItem>
                  ) : (
                    <></>
                  )}
                </SidebarItemGroup>
                {isAuthenticated ? (
                  <SidebarItemGroup>
                    <SidebarItem
                      href="#"
                      icon={() => (
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      )}
                      onClick={onSignOut}
                    >
                      로그아웃
                    </SidebarItem>
                  </SidebarItemGroup>
                ) : (
                  <SidebarItemGroup>
                    <SidebarItem
                      href="/login"
                      icon={() => (
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                      )}
                    >
                      로그인
                    </SidebarItem>
                    <SidebarItem
                      href="/signup"
                      icon={() => <FontAwesomeIcon icon={faUserPlus} />}
                    >
                      회원가입
                    </SidebarItem>
                  </SidebarItemGroup>
                )}
              </SidebarItems>
            </div>
          </div>
        </Sidebar>
      </DrawerItems>
    </Drawer>
  );
};

export default RightMenuDrawer;
