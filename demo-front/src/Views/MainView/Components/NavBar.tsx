import React from "react";
import "./Header.css";
import NavButton from "./NavButton";
import { inject, observer } from "mobx-react";
import { AuthStore } from "Stores/AuthStore";
import { MainStore } from "Stores/MainStore";

const NavBar: React.FC<{ authStore?: AuthStore }> = ({ authStore }) => {
  return (
    <div className="header-navbar">
      <div>
        <NavButton href="/wiki/class" text="WIKI &ndash; классы" />

        {authStore?.isAuth && <NavButton href="/wiki/class/create" text="+" />}
      </div>

      <div>
        <NavButton href="/wiki/individual" text="WIKI &ndash; экземляры" />

        {authStore?.isAuth && (
          <NavButton href="/wiki/individual/create" text="+" />
        )}
      </div>

      <NavButton href="/content" text="Подобрать образовательный контент" />
    </div>
  );
};

export default inject(({ store }: { store: MainStore }) => ({
  authStore: store.authStore,
}))(observer(NavBar));
