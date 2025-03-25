import { IndividualDTO, EmptyIndividualDTO } from "DTO/WikiView/IndividualDTO";
import { ObjectPropertyDTO } from "DTO/WikiView/ObjectPropertyDTO";
import { IndividualDataStore } from "./IndividualDataStore";
import { MainStore } from "Stores/MainStore";
import IndividualSender from "Senders/WikiView/IndividualSender";
import { toJS } from "mobx";
import { Create } from "./API/Create";
import { ContentStoreApi } from "./API/ContentStore";
import { ChangeEvent } from "react";
import { LC_FORM_ID } from "LCConstants";

export class IndividualStore extends Create implements ContentStoreApi {
  public individual: IndividualDataStore;
  public allObjectProperties: ObjectPropertyDTO[];
  private root: MainStore;

  constructor(root: MainStore) {
    super();
    this.root = root;
    this.individual = new IndividualDataStore(new EmptyIndividualDTO());
    this.allObjectProperties = [];
    this.id = "";
  }

  public setIndividual = (individualData: IndividualDTO): void => {
    this.individual = new IndividualDataStore(individualData);
    this.id = individualData.id;
  };

  get createTitle(): string {
    return "Название экземпляра: ";
  }

  public changeId(event: ChangeEvent<HTMLInputElement>): void {
    this.id = event.currentTarget.value;
    this.individual.changeId(event);
  }

  public setAllObjectProperties = (
    allObjectProperties: ObjectPropertyDTO[]
  ): void => {
    this.allObjectProperties = allObjectProperties;
  };

  get canBeDeleted(): boolean {
    return !this.isNew && this.individual.classesIds.includes(LC_FORM_ID);
  }

  showDeleteView = (): void => {
    this.root.showDeleteIndividualView(this.id);
  };

  delete = (individualId: string): void => {
    IndividualSender.sendToDeleteIndividual(individualId)
      .then(() => {
        alert("Экземпляр " + individualId + " успешно удален");
      })
      .catch((error) => {
        alert(error);
      });
  };

  get contentTitle(): string {
    return this.isNew ? "Создание экземпляра " + LC_FORM_ID : "Экземпляр: " + this.id;
  }

  saveIndividual = (event: any): void => {
    event.preventDefault();
    let saveIndividualPromise: Promise<string> =
      this.id === ""
        ? IndividualSender.sendToCreateIndividual(toJS(this.individual))
        : IndividualSender.sendToUpdateIndividual(toJS(this.individual));

    saveIndividualPromise
      .then((individualId) => {
        alert("Экземпляр " + individualId + " успешно сохранен");
      })
      .catch((error) => {
        alert(error);
      });
  };
}
