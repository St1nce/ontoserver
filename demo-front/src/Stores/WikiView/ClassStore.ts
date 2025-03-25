import { ClassDTO, EmptyClassDTO } from "DTO/WikiView/ClassDTO";
import { ClassDataStore } from "./ClassViewStoreStores/ClassDataStore";
import { MainStore } from "Stores/MainStore";
import ClassSender from "Senders/WikiView/ClassSender";
import { toJS } from "mobx";
import { Create } from "./API/Create";
import { ContentStoreApi } from "./API/ContentStore";
import { ChangeEvent } from "react";
import { LC_FORM_ID } from "LCConstants";

export class ClassStore extends Create implements ContentStoreApi {
  public classDataStore: ClassDataStore;
  public allAnnotationTypes: string[];
  private root: MainStore;

  constructor(root: MainStore) {
    super();
    this.root = root;
    this.classDataStore = new ClassDataStore(new EmptyClassDTO());
    this.allAnnotationTypes = [];
  }

  public setClass = (classData: ClassDTO): void => {
    this.classDataStore = new ClassDataStore(classData);
    this.id = classData.id;
  };

  get createTitle(): string {
    return "Название класса: ";
  }

  public changeId(event: ChangeEvent<HTMLInputElement>): void {
    this.id = event.currentTarget.value;
    this.classDataStore.changeId(event);
  }

  public setAnnotationsTypes = (annotationsTypes: string[]): void => {
    this.allAnnotationTypes = annotationsTypes;
  };

  get freeAnnotationTypes(): string[] {
    return this.allAnnotationTypes.filter(
      (item) =>
        !Array.from(this.classDataStore.annotations.keys()).includes(item)
    );
  }

  get canBeDeleted(): boolean {
    return !this.isNew && this.classDataStore.parentsIds.includes(LC_FORM_ID);
  }

  showDeleteView = (): void => {
    this.root.showDeleteClassView(this.id);
  };

  delete = (classId: string): void => {
    ClassSender.sendToDeleteClass(classId)
      .then(() => {
        alert("Класс " + classId + " успешно удален");
      })
      .catch((error) => {
        alert(error);
      });
  };

  get contentTitle(): string {
    return this.isNew ? "Создание подкласса " + LC_FORM_ID : "Класс: " + this.id;
  }

  saveClass = (event: any): void => {
    event.preventDefault();

    let saveClassPromise: Promise<string> =
      this.id === ""
        ? ClassSender.sendToCreateClass(toJS(this.classDataStore))
        : ClassSender.sendToUpdateClass(toJS(this.classDataStore));

    saveClassPromise
      .then((classId) => {
        alert("Класс " + classId + " успешно сохранен");
      })
      .catch((error) => {
        alert(error);
      });
  };
}
