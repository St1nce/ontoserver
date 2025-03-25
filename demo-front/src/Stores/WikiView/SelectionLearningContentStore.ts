import { ContentStoreApi } from "./API/ContentStore";
import { ObservableMap, makeAutoObservable, observable, toJS } from "mobx";
import { DataPropertyDTO } from "DTO/WikiView/DataPropertyDTO";
import { ChangeEvent } from "react";
import LearningContentSender from "Senders/WikiView/LearningContentSender";
import { LearningContentDTO } from "DTO/WikiView/LearningContentDTO";
import { IndividualDataStore } from "./IndividualDataStore";
import { ObjectPropertyDTO } from "DTO/WikiView/ObjectPropertyDTO";
import { EmptyIndividualDTO } from "DTO/WikiView/IndividualDTO";

export class SelectionLCStore implements ContentStoreApi {
  async getRisonerCalculations() {
    throw new Error("Method not implemented.");
  }
  public individual: IndividualDataStore;
  public allObjectProperties: ObjectPropertyDTO[];
  public allDataProperties: DataPropertyDTO[];
  public result: LearningContentDTO;
  risonerCalculations: any;
  isResultShow: boolean = false;

  constructor() {
    this.result = { classesIds: [], individualsIds: [] };
    this.allDataProperties = [];
    this.allObjectProperties = [];
    this.individual = new IndividualDataStore(new EmptyIndividualDTO());
    makeAutoObservable(this);
  }

  public setDataProperties = (dataProperties: DataPropertyDTO[]): void => {
    this.allDataProperties = observable.array(dataProperties);
  };

  public setObjectProperties = (
    objectProperties: ObjectPropertyDTO[]
  ): void => {
    this.allObjectProperties = observable.array(
      objectProperties.filter(
        (objectProperty: ObjectPropertyDTO) =>
          objectProperty.id !== "isRecommended"
      )
    );
  };

  get canBeDeleted(): boolean {
    return false;
  }

  get contentTitle(): string {
    return "Подбор образовательного контента";
  }

  changeShowResult(showResult: boolean) {
    this.isResultShow = showResult;
  }

  changeDataProperty(
    e: ChangeEvent<HTMLInputElement>,
    dataPropertyid: string
  ): void {
    this.changeShowResult(false);
    let dataProperty: DataPropertyDTO | undefined = this.allDataProperties.find(
      (dataProperty) => dataProperty.id === dataPropertyid
    );

    let value = e.currentTarget.value;
    if (value === "") this.individual.deleteDataProperty(dataPropertyid);
    else if (dataProperty) {
      let dataPropertyValue = { type: dataProperty.type, value: "" };

      switch (dataProperty.type) {
        case "integer" || "string":
          dataPropertyValue.value = value;
          break;
        default:
          break;
      }

      this.individual.changeDataPropertyValue(
        dataPropertyid,
        dataPropertyValue
      );
    }
  }

  converterType(type: string): string {
    switch (type) {
      case "integer":
        return "number";
      case "string":
        return "";
      case "boolean":
        return "checkbox";
      default:
        return "";
    }
  }

  async getResult() {
    return LearningContentSender.sendToGetRecommendedLearningContent(
      toJS(this.individual.dataPropertiesIdsWithValue),
      this.individual.objectPropertiesIdsWithValuesIds
    );
  }
}
