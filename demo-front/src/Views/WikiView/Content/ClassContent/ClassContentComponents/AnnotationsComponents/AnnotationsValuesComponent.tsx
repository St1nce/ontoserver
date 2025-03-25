import { DeleteDefaultButton } from "Components/IconButtons";
import { ClassDataStore } from "Stores/WikiView/ClassViewStoreStores/ClassDataStore";
import { observer } from "mobx-react";

export const AnnotationsValuesComponent: React.FC<{
  classDataStore: ClassDataStore;
  isAuth: boolean;
}> = observer(({ classDataStore, isAuth }) => {
  let annotationValueView = isAuth
    ? (id: string, value: string) => (
        <>
          <label>{id}:</label>
          <input
            defaultValue={value}
            onChange={(e) => {
              classDataStore.changeAnnotationValue(e, id);
            }}
          />
          <DeleteDefaultButton
            onClick={() => {
              classDataStore.deleteAnnotation(id);
            }}
          />
        </>
      )
    : (id: string, value: string) => (
        <>
          <label>{id}:</label>
          <p>&emsp;{value}</p>
        </>
      );

  return (
    <>
      {classDataStore.annotationsEntities.map(([id, value]) => (
        <div className="inputLine" key={"AnnotationValue" + id}>
          {annotationValueView(id, value)}
        </div>
      ))}
    </>
  );
});
