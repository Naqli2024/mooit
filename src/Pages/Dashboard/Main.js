import React, { useState } from "react";
import warehouse from "../../assests/images/warehouse.svg";
import { dashboardItems } from "../../Data/SidebarData";
import mooitLogo from "../../assests/images/mooit-logo.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const Main = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Collapse state
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuToggle = (menuPath) => {
    if (isCollapsed) {
      setIsCollapsed(false); 
    }
    setOpenMenu((prevMenu) => (prevMenu === menuPath ? null : menuPath));
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <div className="menu-icon" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
      </div>

      <div className="layout-container">
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}
         style={{ flex: isCollapsed ? "0 0 4%" : "0 0 20%" }}>
          <div className="warehouse">
            <img src={warehouse} alt="warehouse" />
            {!isCollapsed && <h2>Warehouse</h2>}
          </div>

          <ul className="nav flex-column">
            {dashboardItems.map((item) => (
              <React.Fragment key={item.path}>
                <li
                  className={`side-links ${
                    !item.submenus && location.pathname === `/admin/${item.path}` ? "active" : ""
                  }`}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  {item.submenus ? (
                    <>
                      <div
                        className="d-flex justify-content-between align-items-center w-100"
                        onClick={() => handleMenuToggle(item.path)}
                      >
                        <span className="nav-link">
                          {item.icon} {!isCollapsed && item.item}
                        </span>
                        {!isCollapsed && (
                          <span className="dropdown-arrow">
                            {openMenu === item.path ? <FaCaretDown /> : <FaCaretRight />}
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <Link className="nav-link" to={`/admin/${item.path}`} onClick={toggleSidebar}>
                      {item.icon} {!isCollapsed && item.item}
                    </Link>
                  )}
                </li>

                {item.submenus && openMenu === item.path && !isCollapsed && (
                  <ul className="nav flex-column sub-menus ms-3">
                    {item.submenus.map((submenu) => (
                      <li
                        key={submenu.path}
                        className={`side-links ${
                          location.pathname === `/admin/${submenu.path}` ? "active" : ""
                        }`}
                      >
                        <Link className="nav-link" to={`/admin/${submenu.path}`} onClick={toggleSidebar}>
                          {submenu.item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>

          {/* Sidebar Footer with Collapse Button */}
          <div className="sidebar-footer">
            <hr style={{ margin: "0px 20px" }} />
            <div className="sidebar-logo">
              {!isCollapsed &&<img src={mooitLogo} alt="mooit-logo" />}
              <div onClick={toggleCollapse}>
                {isCollapsed ? <IoIosArrowDropright /> : <IoIosArrowDropleft />}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mainbar">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;
