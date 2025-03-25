import { LearningContentDTO } from "DTO/WikiView/LearningContentDTO";
import { Sender, serverOrigin } from "../Configs";

class LearningContentSender {
  private path = "/LC/content";

  sendToGetRecommendedLearningContent = async (
    dataProperties: Map<string, { type: string; value: string }>,
    objectProperties: Map<string, string[]>
  ): Promise<LearningContentDTO> => {
    let url: string = serverOrigin + this.path + "/result";

    let body = JSON.stringify(
      { dataPropertiesIdsWithValue: dataProperties },
      (key: any, value: any) => {
        if (value instanceof Map) {
          let object = {};

          Array.from(value.entries()).forEach((value) => {
            object = { ...object, [value[0]]: value[1] };
          });

          return object;
        } else return value;
      }
    );

    console.log(body);

    let response = await Sender.sendRequest({
      url: url,
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.object;
  };
}

export default new LearningContentSender();
