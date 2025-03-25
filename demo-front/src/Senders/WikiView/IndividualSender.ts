import { AsideElementDTO } from "DTO/WikiView/AsideElementDTO";
import { Sender, serverOrigin } from "../Configs";
import { IndividualDTO } from "DTO/WikiView/IndividualDTO";
import { IndividualDataStore } from "Stores/WikiView/IndividualDataStore";

class IndividualSender {
  private path = "/LC/individual";

  sendToGetAllIndividuals = async (): Promise<AsideElementDTO[]> => {
    let url: string = serverOrigin + this.path + "/list";
    try {
      let response = await Sender.sendRequest({
        url: url,
        method: "GET",
      });
      return response.object;
    } catch (error) {
      console.error("Ошибка:", error);
      return [];
    }
  };

  sendToGetIndividualInfo = async (
    individualId: string
  ): Promise<IndividualDTO> => {
    let url: string = serverOrigin + this.path + "/one/" + individualId;
    let response = await Sender.sendRequest({
      url: url,
      method: "GET",
    });
    return response.object;
  };

  sendToUpdateIndividual = async (
    individualDataStore: IndividualDataStore
  ): Promise<string> => {
    let url: string = serverOrigin + this.path + "/update";

    let req: any = individualDataStore;

    let response = await Sender.sendRequestWithAuthorization({
      url: url,
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.object;
  };

  sendToCreateIndividual = async (
    individualDataStore: IndividualDataStore
  ): Promise<string> => {
    let url: string = serverOrigin + this.path + "/create";

    let req: any = individualDataStore;

    let response = await Sender.sendRequestWithAuthorization({
      url: url,
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.object;
  };

  sendToDeleteIndividual = async (individualId: string): Promise<string> => {
    let url: string = serverOrigin + this.path + "/delete";
    let response = await Sender.sendRequestWithAuthorization({
      url: url,
      method: "DELETE",
      body: JSON.stringify({ id: individualId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.object;
  };
}

export default new IndividualSender();
