import { IndividualDTO } from "DTO/WikiView/IndividualDTO";
import { ObjectPropertyDTO } from "DTO/WikiView/ObjectPropertyDTO";
import {
  ObservableMap,
  action,
  computed,
  makeObservable,
  observable,
} from "mobx";
import { ChangeEvent } from "react";

export class IndividualDataStore {
  public id: string;
  public classesIds: string[];
  public objectPropertiesIdsWithValuesIds: ObservableMap<string, string[]>;
  public dataPropertiesIdsWithValue: ObservableMap<
    string,
    { type: string; value: string }
  >;

  constructor(individualData: IndividualDTO) {
    this.id = individualData.id;
    this.classesIds = individualData.classesIds;

    this.objectPropertiesIdsWithValuesIds = observable.map(
      individualData.objectPropertiesIdsWithValuesIds
    );

    this.dataPropertiesIdsWithValue = observable.map(
      individualData.dataPropertiesIdsWithValue
    );

    makeObservable(this);
  }

  @action changeId(event: ChangeEvent<HTMLInputElement>) {
    this.id = event.currentTarget.value;
  }
  @action deleteObjectProperty = (objectPropertyId: string) => {
    this.objectPropertiesIdsWithValuesIds.delete(objectPropertyId);
  };

  @action deleteDataProperty(dataPropertyid: string) {
    this.dataPropertiesIdsWithValue.delete(dataPropertyid);
  }
  @action changeObjectPropertyValue = (
    event: ChangeEvent<HTMLSelectElement>,
    objectPropertyId: string
  ) => {
    let objectPropertyValue =
      event.currentTarget.options[event.currentTarget.selectedIndex].text;

    this.objectPropertiesIdsWithValuesIds.set(objectPropertyId, [
      objectPropertyValue,
    ]);
  };

  @action changeDataPropertyValue = (
    dataPropertyId: string,
    dataPropertyValue: {
      type: string;
      value: string;
    }
  ) => {
    this.dataPropertiesIdsWithValue.set(dataPropertyId, dataPropertyValue);
  };

  @computed get objectProperties(): ObjectPropertyDTO[] {
    return Array.from(
      this.objectPropertiesIdsWithValuesIds.entries(),
      (element) =>
        new ObjectPropertyDTO({ id: element[0], individualsIds: element[1] })
    );
  }
}
