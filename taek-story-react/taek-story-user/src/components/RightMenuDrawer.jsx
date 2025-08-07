import "./RightMenuDrawer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faUserPlus,
  faMagnifyingGlass,
  faArrowRightFromBracket,
  faHome,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  TextInput,
} from "flowbite-react";

const RightMenuDrawer = ({ isMenuOpen, menuCloseHandler }) => {
  return (
    <>
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
                      href="/authentication/sign-in"
                      icon={() => <FontAwesomeIcon icon={faHome} />}
                    >
                      홈
                    </SidebarItem>
                    <SidebarItem
                      href="/authentication/sign-up"
                      icon={() => <FontAwesomeIcon icon={faUserGear} />}
                    >
                      계정
                    </SidebarItem>
                  </SidebarItemGroup>
                  <SidebarItemGroup>
                    <SidebarItem
                      href="https://github.com/themesberg/flowbite-react/"
                      icon={() => (
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                      )}
                    >
                      로그인
                    </SidebarItem>
                    <SidebarItem
                      href="https://flowbite-react.com/"
                      icon={() => <FontAwesomeIcon icon={faUserPlus} />}
                    >
                      회원가입
                    </SidebarItem>
                    <SidebarItem
                      href="https://github.com/themesberg/flowbite-react/issues"
                      icon={() => (
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      )}
                    >
                      로그아웃
                    </SidebarItem>
                  </SidebarItemGroup>
                </SidebarItems>
              </div>
            </div>
          </Sidebar>
        </DrawerItems>
      </Drawer>
    </>
  );
};

export default RightMenuDrawer;
