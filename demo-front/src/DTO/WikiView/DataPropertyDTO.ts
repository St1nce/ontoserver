import { makeAutoObservable } from "mobx";

export class DataPropertyDTO {
  public id: string;
  public type: string;
  public value: any;

  constructor(dataPropertyData: { id: string; type: string }) {
    this.id = dataPropertyData.id;
    this.type = dataPropertyData.type;
    makeAutoObservable(this);
  }

  changeValue = (value: any): void => {
    this.value = value;
  };
}
