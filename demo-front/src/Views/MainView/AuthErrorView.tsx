import React, { useEffect } from "react";
import "./MainView.css";
import { inject } from "mobx-react";
import { MainStore } from "Stores/MainStore";
import { Navigate } from "react-router-dom";

const AuthErrorBoundary: React.FC<{ mainStore?: MainStore }> = ({
  mainStore,
}) => {
  useEffect(() => {
    mainStore?.showAuthView();
  }, []);

  return <Navigate to="../" replace={true} />;
};

export default inject(({ store }: { store: MainStore }) => ({
  mainStore: store,
}))(AuthErrorBoundary);
