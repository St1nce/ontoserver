import { AuthStore } from "Stores/AuthStore";
import { ClassStore } from "Stores/WikiView/ClassStore";

const SelectAnnotationType: React.FC<{
  classStore: ClassStore;
}> = ({ classStore }) => {
  return (
    <select onChange={classStore.classDataStore.addAnnotationType}>
      <option value={""} hidden>
        Добавить аннотацию
      </option>
      {classStore.freeAnnotationTypes.map((annotationType) => (
        <option key={"annotationType" + annotationType} value={annotationType}>
          {annotationType}
        </option>
      ))}
    </select>
  );
};

const AnnotationAddComponent: React.FC<{
  classStore: ClassStore;
  authStore: AuthStore;
}> = ({ classStore, authStore }) => {
  return (
    <>
      {authStore.isAuth && (
        <div className="inputLine">
          <SelectAnnotationType classStore={classStore} />
        </div>
      )}
    </>
  );
};

export default AnnotationAddComponent;
