export class IndividualDTO {
  public id: string;
  public classesIds: string[];
  public objectPropertiesIdsWithValuesIds: Map<string, string[]>;
  public dataPropertiesIdsWithValue: Map<
    string,
    { type: string; value: string }
  >;

  constructor(individualData: {
    id: string;
    classesIds: string[];
    objectPropertiesIdsWithValuesIds: Map<string, string[]>;
    dataPropertiesIdsWithValue: Map<string, { type: string; value: string }>;
  }) {
    this.id = individualData.id;
    this.classesIds = individualData.classesIds;
    this.objectPropertiesIdsWithValuesIds =
      individualData.objectPropertiesIdsWithValuesIds;
    this.dataPropertiesIdsWithValue = individualData.dataPropertiesIdsWithValue;
  }
}

export class EmptyIndividualDTO extends IndividualDTO {
  constructor() {
    super({
      id: "",
      classesIds: [],
      objectPropertiesIdsWithValuesIds: new Map<string, string[]>(),
      dataPropertiesIdsWithValue: new Map<
        string,
        { type: string; value: string }
      >(),
    });
  }
}
