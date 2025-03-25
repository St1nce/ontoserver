export class ObjectPropertyDTO {
  public id: string;
  public individualsIds: string[];

  constructor(objectPropertyData: { id: string; individualsIds: string[] }) {
    this.id = objectPropertyData.id;
    this.individualsIds = objectPropertyData.individualsIds;
  }
}
