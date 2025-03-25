import { ClassDTO } from "DTO/WikiView/ClassDTO";
import {
  IMapEntries,
  IObservableArray,
  ObservableMap,
  action,
  computed,
  makeObservable,
  observable,
} from "mobx";
import { ChangeEvent } from "react";

export class ClassDataStore {
  @observable public id: string;
  public parentsIds: string[];
  public childrenIds: string[];
  public individualsIds: string[];
  @observable public annotations: ObservableMap<string, string>;
  @observable public equivalentAxioms: IObservableArray<string>;

  constructor(classData: ClassDTO) {
    this.id = classData.id;
    this.parentsIds = classData.parentsIds;
    this.childrenIds = classData.childrenIds;
    this.individualsIds = classData.individualsIds;
    this.annotations = observable.map(classData.annotations);
    this.equivalentAxioms = observable.array(classData.equivalentAxioms);
    makeObservable(this);
  }

  @computed get annotationsEntities(): IMapEntries<string, string> {
    return Array.from(this.annotations.entries());
  }

  @action changeId(event: ChangeEvent<HTMLInputElement>) {
    this.id = event.currentTarget.value;
  }

  @action addAnnotationType = (event: ChangeEvent<HTMLSelectElement>) => {
    let annotationId =
      event.currentTarget.options[event.currentTarget.selectedIndex].text;

    this.annotations.set(annotationId, "");

    event.currentTarget.selectedIndex = 0;
  };

  @action changeAnnotationValue = (
    event: ChangeEvent<HTMLInputElement>,
    annotationId: string
  ) => {
    let annotationValue = event.currentTarget.value;
    this.annotations.set(annotationId, annotationValue);
  };

  @action deleteAnnotation = (annotationId: string) => {
    this.annotations.delete(annotationId);
  };

  @action changeEquivalentAxiom = (
    event: ChangeEvent<HTMLTextAreaElement>,
    axiomIndex: number
  ) => {
    let equivalentAxiomValue = event.currentTarget.value;

    this.equivalentAxioms[axiomIndex] = equivalentAxiomValue;
  };

  @action deleteEquivalentAxiom = (axiomIndex: number) => {
    this.equivalentAxioms.replace(
      this.equivalentAxioms.filter((_, index) => index !== axiomIndex)
    );
  };

  @action addEquivalentAxiom = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let equivalentAxiomValue = event.currentTarget.value;
    this.equivalentAxioms.replace([
      ...this.equivalentAxioms,
      equivalentAxiomValue,
    ]);
    event.currentTarget.value = "";
  };
}
