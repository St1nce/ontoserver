import { ClassDataStore } from "Stores/WikiView/ClassViewStoreStores/ClassDataStore";

const EquivalentAxiomAddComponent: React.FC<{
  classDataStore: ClassDataStore;
  isAuth: boolean;
}> = ({ classDataStore, isAuth }) => {
  return (
    <>
      {isAuth && (
        <div className="inputLine">
          <textarea
            rows={10}
            onBlur={classDataStore.addEquivalentAxiom}
            placeholder="Добавить аксиому эквивалентности"
          />
        </div>
      )}
    </>
  );
};

export default EquivalentAxiomAddComponent;
