import { AuthStore } from "Stores/AuthStore";
import { MainStore } from "Stores/MainStore";
import AuthErrorBoundary from "Views/MainView/AuthErrorView";
import { inject, observer } from "mobx-react";
import React from "react";
import { Await } from "react-router-dom";

const RequireAuth: React.FC<{
  children: React.ReactNode;
  authStore?: AuthStore;
}> = ({ children, authStore }) => {
  return (
    <React.Suspense>
      <Await resolve={authStore?.checkAccess()}>
        {authStore?.isAuth ? children : <AuthErrorBoundary />}
      </Await>
    </React.Suspense>
  );
};

export default inject(({ store }: { store: MainStore }) => ({
  authStore: store.authStore,
}))(observer(RequireAuth));
