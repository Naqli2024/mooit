import React, { useState } from "react";
import warehouse from "../../images/warehouse.svg";
import { dashboardItems } from "../../Data/SidebarData";
import mooitLogo from "../../images/mooit-logo.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

const Main = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // This state tracks the open menu path

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuToggle = (menuPath) => {
    // If the clicked menu is already open, close it, else open it
    setOpenMenu((prevMenu) => (prevMenu === menuPath ? null : menuPath));
  };

  return (
    <>
      <div className="menu-icon" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
      </div>
      <div className="layout-container">
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="warehouse">
            <img src={warehouse} alt="warehouse" />
            <p>Warehouse</p>
          </div>
          <ul className="nav flex-column">
            {dashboardItems.map((item) => (
              <React.Fragment key={item.path}>
                {/* Main Menu Item */}
                <li
                  className={`side-links ${location.pathname.includes(item.path) ? "active" : ""}`}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  {item.submenus ? (
                    <>
                      <div
                        className="d-flex justify-content-between align-items-center w-100"
                        onClick={() => handleMenuToggle(item.path)} // Toggle submenu visibility
                      >
                        <span className="nav-link">{item.item}</span>
                        <span className="dropdown-arrow">
                          {openMenu === item.path ? <FaCaretDown /> : <FaCaretRight />}
                        </span>
                      </div>
                    </>
                  ) : (
                    <Link
                      className="nav-link"
                      to={`/admin/${item.path}`}
                      onClick={toggleSidebar}
                    >
                      {item.item}
                    </Link>
                  )}
                </li>

                {/* Submenu Items */}
                {item.submenus && openMenu === item.path && (
                  <ul className="nav flex-column sub-menus ms-3">
                    {item.submenus.map((submenu) => (
                      <li
                        key={submenu.path}
                        className={`side-links ${
                          location.pathname.includes(submenu.path) ? "active" : ""
                        }`}
                      >
                        <Link
                          className="nav-link"
                          to={`/admin/${submenu.path}`}
                          onClick={toggleSidebar}
                        >
                          {submenu.item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
          <div className="sidebar-footer">
            <hr style={{ margin: "0px 20px" }} />
            <div className="sidebar-logo">
              <img src={mooitLogo} alt="mooit-logo" />
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
