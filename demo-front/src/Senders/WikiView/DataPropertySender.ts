import { DataPropertyDTO } from "DTO/WikiView/DataPropertyDTO";
import { Sender, serverOrigin } from "../Configs";

class DataPropertySender {
  private path = "/LC/dataProperty";

  sendToGetAllDataProperties = async (
    domainId: string
  ): Promise<DataPropertyDTO[]> => {
    let url: string = serverOrigin + this.path + "/list/" + domainId;
    let response = await Sender.sendRequest({
      url: url,
      method: "GET",
    });
    return response.object;
  };
}

const dataPropertySender = new DataPropertySender();

export default dataPropertySender;
