// === PACKAGE IMPORTS===
import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

// === FILE IMPORTS ===
import Auth from "../../utils/auth";

// ANT Layout for Header
const { Header } = Layout;

// Header component variable function
const HeaderComponent = () => {
  // logout function for users to logout if logged in
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const handleToggle = () => {};

  // JSX for global App that changes if a user is logged in
  return (
    <>
      <Header className="nav">
        <div>
          <Link to="/mission">
            <h1 className="logo"> Live Wire </h1>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link to="/" className="nav-links">
                Setlist
              </Link>
              <Link to="/compose" className="nav-links">
                Compose
              </Link>
              <Link to="/profile" className="nav-links">
                Profile
              </Link>
              <a href="/" className="nav-links logout-btn" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-links">
                Login
              </Link>
              <Link to="/signup" className="nav-links alt-btn">
                Signup
              </Link>
            </>
          )}
          <FaBars className="menu-btn" onClick={handleToggle} />
        </div>
      </Header>
    </>
  );
};

// Export HeaderComponent
export default HeaderComponent;
