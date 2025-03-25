import { Sender, serverOrigin } from "./Configs";

class AccessSender {
  private path = "/access";

  sendToGetAccess = async (): Promise<{mail: string}> => {
    let url: string = serverOrigin + this.path;

    return Sender.sendRequestWithAuthorization({
      url: url,
      method: "GET",
      headers: {},
    }).then((answer) => {
      return answer.object;
    })
  };
}

export default new AccessSender();
