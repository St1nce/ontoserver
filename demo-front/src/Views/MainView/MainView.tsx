import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Content from "./Components/Content";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "./MainView.css";
import AuthView from "Views/AuthView/AuthView";
import DeleteEntityView from "../AuthView/DeleteEntityView";
import { inject } from "mobx-react";
import { MainStore } from "Stores/MainStore";
import RegistrationView from "Views/RegistrationView/RegistrationView";

const MainView: React.FC<{ mainStore?: MainStore }> = ({ mainStore }) => {
  let [isShow, setShow] = useState(false);

  const handleVisibleButton = () => {
    const position = window.scrollY;

    if (position > 100) {
      return setShow(true);
    } else {
      return setShow(false);
    }
  };

  useLayoutEffect(() => {
    mainStore?.authStore.checkAccess();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  });

  return (
    <>
      <div className="main">
        <Header />
        <Content />
        <Footer />
        <button
          className={
            isShow ? "to-top primary red show" : "to-top primary red hidden"
          }
          onClick={() => {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
          }}
        >
          <span>Наверх</span>
        </button>
      </div>
      <AuthView />
      <RegistrationView />
      <DeleteEntityView />
    </>
  );
};

export default inject(({ store }: { store: MainStore }) => ({
  mainStore: store,
}))(MainView);
