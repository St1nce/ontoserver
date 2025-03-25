import React from "react";
import "./Header.css";
import { VerticalLine } from "Components/Line";
import { MainStore } from "Stores/MainStore";
import { inject, observer } from "mobx-react";
import { NavLink } from "react-router-dom";

const HeaderTop: React.FC<{ mainStore?: MainStore }> = ({ mainStore }) => {
  return (
    <div className="header-top">
      <a href="help">Справка</a>
      <VerticalLine />

      {mainStore?.authStore.isAuth ? (
        <>
          <NavLink to="/profile">Профиль</NavLink>
          <VerticalLine />
          <a href="#" onClick={mainStore?.showRegistrationView}>
            Новый администратор
          </a>
          <VerticalLine />
          <a href="/" onClick={mainStore?.authStore.exit}>
            Выйти
          </a>
        </>
      ) : (
        <a href="#" onClick={mainStore?.showAuthView}>
          Войти
        </a>
      )}
    </div>
  );
};

export default inject(({ store }: { store: MainStore }) => ({
  mainStore: store,
}))(observer(HeaderTop));
