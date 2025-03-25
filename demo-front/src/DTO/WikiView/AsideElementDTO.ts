export class AsideElementDTO {
  id: string;
  classesIds?: string[];
  children?: AsideElementDTO[];

  constructor(asideData: {id: string, classesIds?: string[], children?: AsideElementDTO[];}){
    this.id = asideData.id;
    this.classesIds = asideData.classesIds;
    this.children = asideData.children;
  }
};
