import { MainStore } from "Stores/MainStore";
import { SubmitButton } from "Views/WikiView/Content/Components/SaveButton";
import { inject } from "mobx-react";
import React from "react";
import { Await } from "react-router-dom";
import { useLoaderData } from "utils/route/UseLoaderData";
import { Title } from "../Components/Title";
import { SelectionLCStore } from "Stores/WikiView/SelectionLearningContentStore";
import { ResultDiv } from "./SelectionContentComponents/Result";
import { DataProperties } from "./SelectionContentComponents/DataProperties";
import "../Content.css";
import { DataPropertyDTO } from "DTO/WikiView/DataPropertyDTO";
import ObjectProperties from "../IndividualContent/IndividualContentComponents/ObjectProperties";
import { ObjectPropertyDTO } from "DTO/WikiView/ObjectPropertyDTO";

const SelectionLCForm: React.FC<{
  selectionLCStore: SelectionLCStore;
}> = ({ selectionLCStore }) => {
  return (
    <form
      className="main-content"
      onSubmit={(e) => {
        e.preventDefault();
        selectionLCStore.changeShowResult(true);
      }}
    >
      <Title contentStore={selectionLCStore} />
      <DataProperties selectionLCStore={selectionLCStore} />
      <ObjectProperties store={selectionLCStore} isAuth={true} />
      <SubmitButton>Вычислить</SubmitButton>

      <ResultDiv selectionLCStore={selectionLCStore} />
    </form>
  );
};

const SelectionLCContent: React.FC<{
  selectionLCStore?: SelectionLCStore;
}> = ({ selectionLCStore }) => {
  let selectionLCLoader = useLoaderData<{
    loadDataProperties: Promise<DataPropertyDTO[]>;
    loadObjectProperties: Promise<ObjectPropertyDTO[]>;
  }>();

  if (selectionLCStore instanceof SelectionLCStore)
    return (
      <React.Suspense fallback={<p>Загрузка</p>}>
        <Await
          resolve={Promise.all([
            selectionLCLoader.loadDataProperties,
            selectionLCLoader.loadObjectProperties,
          ])}
          errorElement={<p>Возникла ошибка!</p>}
        >
          {([dataProperties, objectProperties]) => {
            selectionLCStore.setDataProperties(dataProperties);
            selectionLCStore.setObjectProperties(objectProperties);
            return <SelectionLCForm selectionLCStore={selectionLCStore} />;
          }}
        </Await>
      </React.Suspense>
    );
  else return <></>;
};

export default inject(({ store }: { store: MainStore }) => ({
  selectionLCStore: store.selectionLCStore,
}))(SelectionLCContent);
