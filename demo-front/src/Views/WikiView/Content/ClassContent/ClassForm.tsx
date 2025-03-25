import { ClassDTO } from "DTO/WikiView/ClassDTO";
import { AuthStore } from "Stores/AuthStore";
import { ClassStore } from "Stores/WikiView/ClassStore";
import { useAsyncValue } from "utils/route/UseAsyncValue";
import Annotations from "./ClassContentComponents/Annotations";
import EquivalentAxioms from "./ClassContentComponents/EquivalentAxioms";
import { Parents } from "./ClassContentComponents/Parents";
import { Children } from "./ClassContentComponents/Children";
import { Individuals } from "./ClassContentComponents/Individuals";
import { SubmitButton } from "../Components/SaveButton";
import React from "react";
import { observer } from "mobx-react";
import { Title } from "../Components/Title";
import Id from "../Components/Id";

let annotationTypes: string[] = ["comment", "label"];

const ClassForm: React.FC<{
  classStore: ClassStore;
  authStore: AuthStore;
}> = ({ classStore, authStore }) => {
  let classData = useAsyncValue<ClassDTO>();
  classStore.setClass(classData);
  classStore.setAnnotationsTypes(annotationTypes);

  return (
    <form
      onSubmit={classStore.saveClass}
      key={"Class " + classStore.classDataStore.id}
    >
      <Title contentStore={classStore} authStore={authStore}/>
      <Id createStore={classStore}/>
      <Annotations classStore={classStore} authStore={authStore}/>
      <EquivalentAxioms classDataStore={classStore.classDataStore} authStore={authStore}/>
      <Parents classStore={classStore} />
      <Children classStore={classStore} />
      <Individuals classStore={classStore} />

      {authStore.isAuth && <SubmitButton>Сохранить</SubmitButton>}
    </form>
  );
};

export default observer(ClassForm);
