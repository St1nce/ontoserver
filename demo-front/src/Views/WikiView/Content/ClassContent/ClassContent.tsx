import { ClassDTO } from "DTO/WikiView/ClassDTO";
import { ClassStore } from "Stores/WikiView/ClassStore";
import React from "react";
import { Await } from "react-router-dom";
import { useLoaderData } from "utils/route/UseLoaderData";
import "../Content.css";
import { inject } from "mobx-react";
import { MainStore } from "Stores/MainStore";
import ClassForm from "./ClassForm";
import { AuthStore } from "Stores/AuthStore";

const ClassContent: React.FC<{
  classStore?: ClassStore;
  authStore?: AuthStore;
}> = ({ classStore, authStore }) => {
  let classLoader = useLoaderData<{
    loadClass: Promise<ClassDTO>;
  }>();

  if (classStore instanceof ClassStore && authStore instanceof AuthStore)
    return (
      <React.Suspense fallback={<p>Загрузка</p>}>
        <Await
          resolve={classLoader.loadClass}
          errorElement={<p>Возникла ошибка!</p>}
        >
          <ClassForm classStore={classStore} authStore={authStore}></ClassForm>
        </Await>
      </React.Suspense>
    );
  else return <></>;
};

export default inject(({ store }: { store: MainStore }) => ({
  classStore: store.classStore,
  authStore: store.authStore,
}))(ClassContent);
