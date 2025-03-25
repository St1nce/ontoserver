import React from "react";
import "./Header.css";
import { Logo } from "Components/Logo";
import NavBar from "./NavBar";
import HeaderTop from "./HeaderTop";

const Header: React.FC<{}> = () => {
  return (
    <div className="header">
      <Logo />
      <div className="header-content">
        <HeaderTop />
        <NavBar />
      </div>
    </div>
  );
};

export default Header;
