import { DeleteDefaultButton } from "Components/IconButtons";
import { ClassDataStore } from "Stores/WikiView/ClassViewStoreStores/ClassDataStore";

export const EquivalentAxiomValuesComponent: React.FC<{
  classDataStore: ClassDataStore;
  isAuth: boolean;
}> = ({ classDataStore, isAuth }) => {
  return (
    <>
      {classDataStore.equivalentAxioms.map((equivalentAxiom, axiomIndex) => (
        <div className="inputLine" key={axiomIndex}>
          <textarea
            rows={10}
            defaultValue={equivalentAxiom}
            onBlur={(e) => {
              classDataStore.changeEquivalentAxiom(e, axiomIndex);
            }}
            disabled={!isAuth}
          />
          {isAuth && (
            <DeleteDefaultButton
              onClick={() => classDataStore.deleteEquivalentAxiom(axiomIndex)}
            />
          )}
        </div>
      ))}
    </>
  );
};
