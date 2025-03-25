import { IndividualStore } from "Stores/WikiView/IndividualStore";
import React from "react";
import { Await } from "react-router-dom";
import { useLoaderData } from "utils/route/UseLoaderData";
import "../Content.css";
import { Classes } from "./IndividualContentComponents/Classes";
import ObjectProperties from "./IndividualContentComponents/ObjectProperties";
import { SubmitButton } from "../Components/SaveButton";
import { inject, observer } from "mobx-react";
import { MainStore } from "Stores/MainStore";
import { AuthStore } from "Stores/AuthStore";
import { useAsyncValue } from "utils/route/UseAsyncValue";
import { IndividualDTO } from "DTO/WikiView/IndividualDTO";
import { ObjectPropertyDTO } from "DTO/WikiView/ObjectPropertyDTO";
import { Title } from "../Components/Title";
import Id from "../Components/Id";
import { LC_FORM_ID } from "LCConstants";

const IndividualForm: React.FC<{
  individualStore: IndividualStore;
  authStore: AuthStore;
}> = observer(({ individualStore, authStore }) => {
  let [individualData, objectProperties] =
    useAsyncValue<[IndividualDTO, ObjectPropertyDTO[]]>();

  individualStore.setIndividual(individualData);
  individualStore.setAllObjectProperties(objectProperties);

  return (
    <form
      onSubmit={individualStore.saveIndividual}
      key={"Individual " + individualStore.individual.id}
    >
      <Title contentStore={individualStore} authStore={authStore} />
      <Id createStore={individualStore} />
      <Classes individualStore={individualStore} />
      {individualStore.individual.classesIds.includes(LC_FORM_ID) && (
        <>
          <ObjectProperties store={individualStore} isAuth={authStore.isAuth} />
          {authStore.isAuth && <SubmitButton>Сохранить</SubmitButton>}
        </>
      )}
    </form>
  );
});

const IndividualContent: React.FC<{
  individualStore?: IndividualStore;
  authStore?: AuthStore;
}> = ({ individualStore, authStore }) => {
  let individualLoader = useLoaderData<{
    loadIndividualAndObjectProperties: Promise<any>;
  }>();

  if (
    individualStore instanceof IndividualStore &&
    authStore instanceof AuthStore
  )
    return (
      <React.Suspense fallback={<p>Загрузка</p>}>
        <Await
          resolve={individualLoader.loadIndividualAndObjectProperties}
          errorElement={<p>Возникла ошибка!</p>}
        >
          <IndividualForm
            individualStore={individualStore}
            authStore={authStore}
          ></IndividualForm>
        </Await>
      </React.Suspense>
    );
  else return <></>;
};

export default inject(({ store }: { store: MainStore }) => ({
  individualStore: store.individualStore,
  authStore: store.authStore,
}))(IndividualContent);
