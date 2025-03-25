import { Sender, serverOrigin } from "../Configs";
import { ObjectPropertyDTO } from "DTO/WikiView/ObjectPropertyDTO";

class ObjectPropertySender {
  private path = "/LC/objectProperty";

  sendToGetAllObjectProperties = async (
    domainId: string
  ): Promise<ObjectPropertyDTO[]> => {
    let url: string = serverOrigin + this.path + "/list/" + domainId;
    let response = await Sender.sendRequest({
      url: url,
      method: "GET",
    });
    return response.object;
  };
}

const objectPropertySender = new ObjectPropertySender();

export default objectPropertySender;
