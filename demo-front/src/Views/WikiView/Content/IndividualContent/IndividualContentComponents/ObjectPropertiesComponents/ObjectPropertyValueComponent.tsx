import { DeleteDefaultButton } from "Components/IconButtons";
import { ObjectPropertyDTO } from "DTO/WikiView/ObjectPropertyDTO";
import { IndividualDataStore } from "Stores/WikiView/IndividualDataStore";

const SelectObjectPropertyIndividual: React.FC<{
  objectProperty: {
    id: string;
    individualsIds: string[];
    selectedIndividualsIds: string[];
  };
  store: {
    allObjectProperties: ObjectPropertyDTO[];
    individual: IndividualDataStore;
  };
}> = ({ objectProperty, store }) => {
  return (
    <select
      defaultValue={objectProperty.selectedIndividualsIds[0]}
      onChange={(e) => {
        store.individual.changeObjectPropertyValue(
          e,
          objectProperty.id
        );
      }}
    >
      <option value={""} hidden></option>

      {objectProperty.individualsIds.map((individualId, index) => (
        <option key={"optionObjectProperty" + index} value={individualId}>
          {individualId}
        </option>
      ))}
    </select>
  );
};

export const ObjectPropertyValuesComponent: React.FC<{
  id: string;
  objectProperty: {
    id: string;
    individualsIds: string[];
    selectedIndividualsIds: string[];
  };
  store?: {
    allObjectProperties: ObjectPropertyDTO[];
    individual: IndividualDataStore;
  };
  isAuth: boolean;
}> = ({ objectProperty, store, isAuth }) => {
  if (isAuth && store)
    return (
      <>
        <SelectObjectPropertyIndividual
          objectProperty={objectProperty}
          store={store}
        />

        <div className="div-button">
          {objectProperty.selectedIndividualsIds.length !== 0 ? (
            <DeleteDefaultButton
              onClick={() =>
                store.individual.deleteObjectProperty(
                  objectProperty.id
                )
              }
            />
          ) : (
            <DeleteDefaultButton
              id={objectProperty.id}
              onClick={() =>
                store.individual.deleteObjectProperty(
                  objectProperty.id
                )
              }
              disabled={true}
            />
          )}
        </div>
      </>
    );
  else return <p>{objectProperty.selectedIndividualsIds[0]}</p>;
};
