import { ClassStore } from "Stores/WikiView/ClassStore";
import AnnotationAddComponent from "./AnnotationsComponents/AnnotationAddComponent";
import { observer } from "mobx-react";
import { AnnotationsValuesComponent } from "./AnnotationsComponents/AnnotationsValuesComponent";
import React from "react";
import { AuthStore } from "Stores/AuthStore";

const Annotations: React.FC<{
  classStore: ClassStore;
  authStore: AuthStore;
}> = ({ classStore, authStore }) => {
  return (
    <div>
      <label>Аннотации:</label>
      <div className="divValue">
        <AnnotationsValuesComponent
          classDataStore={classStore.classDataStore}
          isAuth={authStore.isAuth}
        />

        {classStore.freeAnnotationTypes.length !== 0 && (
          <AnnotationAddComponent
            classStore={classStore}
            authStore={authStore}
          />
        )}
      </div>
    </div>
  );
};
export default observer(Annotations);
