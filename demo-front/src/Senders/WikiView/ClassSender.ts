import { AsideElementDTO } from "DTO/WikiView/AsideElementDTO";
import { Sender, serverOrigin } from "../Configs";
import { ClassDTO } from "DTO/WikiView/ClassDTO";
import { ClassDataStore } from "Stores/WikiView/ClassViewStoreStores/ClassDataStore";

class ClassSender {
  private path = "/LC/class";

  sendToGetAllClasses = async (): Promise<AsideElementDTO[]> => {
    let url: string = serverOrigin + this.path + "/list";

    let response = await Sender.sendRequest({
      url: url,
      method: "GET",
    });

    return response.object;
  };

  sendToGetClassInfo = async (classId: string): Promise<ClassDTO> => {
    let url: string = serverOrigin + this.path + "/one/" + classId;
    let response = await Sender.sendRequest({
      url: url,
      method: "GET",
    });
    return response.object;
  };

  sendToUpdateClass = async (
    classDataStore: ClassDataStore
  ): Promise<string> => {
    let url: string = serverOrigin + this.path + "/update";

    let req: any = classDataStore;
    req.annotations = Object.fromEntries(classDataStore.annotations);
    req.parentId = classDataStore.parentsIds[0];

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

  sendToCreateClass = async (
    classDataStore: ClassDataStore
  ): Promise<string> => {
    let url: string = serverOrigin + this.path + "/create";

    let req: any = classDataStore;
    req.annotations = Object.fromEntries(classDataStore.annotations);
    req.parentId = classDataStore.parentsIds[0];

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

  sendToDeleteClass = async (classId: string): Promise<string> => {
    let url: string = serverOrigin + this.path + "/delete";
    let response = await Sender.sendRequestWithAuthorization({
      url: url,
      method: "DELETE",
      body: JSON.stringify({ id: classId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.object;
  };
}

export default new ClassSender();
