export class ClassDTO {
  public id: string;
  public parentsIds: string[];
  public childrenIds: string[];
  public individualsIds: string[];
  public annotations: Map<string, string>;
  public equivalentAxioms: string[];

  constructor(classData: {
    id: string;
    parentsIds: string[];
    childrenIds: string[];
    individualsIds: string[];
    annotations: Map<string, string>;
    equivalentAxioms: string[];
  }) {
    this.id = classData.id;
    this.parentsIds = classData.parentsIds;
    this.childrenIds = classData.childrenIds;
    this.individualsIds = classData.individualsIds;
    this.annotations = classData.annotations;
    this.equivalentAxioms = classData.equivalentAxioms;
  }
}

export class EmptyClassDTO extends ClassDTO {
  constructor() {
    super({
      id: "",
      parentsIds: [],
      childrenIds: [],
      individualsIds: [],
      annotations: new Map<string, string>(),
      equivalentAxioms: [],
    });
  }
}
