import React from "react";
import "./WikiView.css";
import WikiAside from "./Aside/Aside";
import { Outlet } from "react-router-dom";

export const WikiView: React.FC<{}> = () => {
  return (
    <div className="wiki">
      <WikiAside />
      <div className="wiki-content">
        <Outlet/>
      </div>
    </div>
  );
};
