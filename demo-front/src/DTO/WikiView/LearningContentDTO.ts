export class LearningContentDTO {
  public classesIds: string[];
  public individualsIds: string[];

  constructor(learningContentData: {
    classesIds: string[];
    individualsIds: string[];
  }) {
    this.classesIds = learningContentData.classesIds;
    this.individualsIds = learningContentData.individualsIds;
  }
}
