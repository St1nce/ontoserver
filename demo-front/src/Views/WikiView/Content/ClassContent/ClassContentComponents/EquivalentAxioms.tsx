import { ClassDataStore } from "Stores/WikiView/ClassViewStoreStores/ClassDataStore";
import { observer } from "mobx-react";
import { EquivalentAxiomValuesComponent } from "./EquivalentAxiomsComponents/EquivalentAxiomValuesComponent";
import EquivalentAxiomAddComponent from "./EquivalentAxiomsComponents/EquivalentAxiomAddComponent";
import React from "react";
import { AuthStore } from "Stores/AuthStore";

export const EquivalentAxioms: React.FC<{
  classDataStore: ClassDataStore;
  authStore: AuthStore;
}> = ({ classDataStore, authStore }) => {
  return (
    <div>
      <label>Аксиомы эквивалентности:</label>
      <div className="divValue">
        <EquivalentAxiomValuesComponent
          classDataStore={classDataStore}
          isAuth={authStore.isAuth}
        />

        <EquivalentAxiomAddComponent
          classDataStore={classDataStore}
          isAuth={authStore.isAuth}
        />
      </div>
    </div>
  );
};

export default observer(EquivalentAxioms);
