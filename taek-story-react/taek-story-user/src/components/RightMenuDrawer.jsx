import {Drawer, DrawerHeader, DrawerItems, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from "flowbite-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faChartPie, faShoppingBag, faUserPlus, faUsers, faTimes} from "@fortawesome/free-solid-svg-icons";
import './RightMenuDrawer.css';

const RightMenuDrawer = ({ isMenuOpen, menuCloseHandler }) => {
  // Flowbite Drawer가 작동하지 않을 경우를 위한 커스텀 Drawer
  if (!isMenuOpen) {
    return null;
  }

  return (
    <div className="right-menu-drawer">
      {/* 오버레이 */}
      <div className="custom-drawer-overlay" onClick={menuCloseHandler}></div>
      
      {/* 커스텀 Drawer */}
      <div className="custom-drawer open">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">MENU</h2>
          <button 
            onClick={menuCloseHandler}
            className="hover:bg-gray-100 rounded-lg p-1 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </button>
        </div>
        
        {/* 메뉴 아이템들 */}
        <div className="p-4">
          <nav className="space-y-2">
            <a href="/" className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
              <FontAwesomeIcon icon={faChartPie} className="mr-3" />
              Dashboard
            </a>
            <a href="/e-commerce/products" className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
              <FontAwesomeIcon icon={faShoppingBag} className="mr-3" />
              Products
            </a>
            <a href="/users/list" className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
              <FontAwesomeIcon icon={faUsers} className="mr-3" />
              Users list
            </a>
            <a href="/authentication/sign-in" className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
              <FontAwesomeIcon icon={faArrowRightToBracket} className="mr-3" />
              Sign in
            </a>
            <a href="/authentication/sign-up" className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
              <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
              Sign up
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default RightMenuDrawer;