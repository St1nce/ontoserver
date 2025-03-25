import { observer } from "mobx-react";
import { ObjectPropertyDTO } from "DTO/WikiView/ObjectPropertyDTO";
import React from "react";
import Columns from "../../Components/Columns";
import { ObjectPropertyValuesComponent } from "./ObjectPropertiesComponents/ObjectPropertyValueComponent";
import { IndividualDataStore } from "Stores/WikiView/IndividualDataStore";

const AdminObjectProperties: React.FC<{
  store: {
    allObjectProperties: ObjectPropertyDTO[];
    individual: IndividualDataStore;
  };
  isAuth: boolean;
}> = observer(({ store, isAuth }) => {
  return (
    <div className="divValue">
      <Columns maxColumnWidth={450}>
        {store.allObjectProperties.map((objectProperty: ObjectPropertyDTO) => {
          let selectedIndividualsIds = store.individual.objectProperties.find(
            (op: ObjectPropertyDTO) => op.id === objectProperty.id
          )?.individualsIds;

          return (
            <ObjectPropertyValuesComponent
              key={"ObjectPropertyValue" + Date.now() + objectProperty.id}
              id={objectProperty.id}
              objectProperty={{
                ...objectProperty,
                selectedIndividualsIds: selectedIndividualsIds
                  ? selectedIndividualsIds
                  : [],
              }}
              store={store}
              isAuth={isAuth}
            />
          );
        })}
      </Columns>
    </div>
  );
});

const UserObjectProperties: React.FC<{
  store: {
    allObjectProperties: ObjectPropertyDTO[];
    individual: IndividualDataStore;
  };
  isAuth: boolean;
}> = ({ store, isAuth }) => {
  return (
    <div className="divValue">
      <Columns maxColumnWidth={400}>
        {store.individual.objectProperties.map(
          (objectProperty: ObjectPropertyDTO) => {
            return (
              <ObjectPropertyValuesComponent
                key={"ObjectPropertyValue" + Date.now() + objectProperty.id}
                id={objectProperty.id}
                objectProperty={{
                  ...objectProperty,
                  selectedIndividualsIds: objectProperty.individualsIds,
                }}
                isAuth={isAuth}
              />
            );
          }
        )}
      </Columns>
    </div>
  );
};

const ObjectProperties: React.FC<{
  store: {
    allObjectProperties: ObjectPropertyDTO[];
    individual: IndividualDataStore;
  };
  isAuth: boolean;
}> = ({ store, isAuth }) => {
  return (
    <div>
      <label>Свойства:</label>

      {isAuth ? (
        <AdminObjectProperties store={store} isAuth={isAuth} />
      ) : (
        <UserObjectProperties store={store} isAuth={isAuth} />
      )}
    </div>
  );
};

export default ObjectProperties;
