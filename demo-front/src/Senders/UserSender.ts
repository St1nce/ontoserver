import { UserDTO } from "DTO/UserDTO";
import { Sender, serverOrigin } from "./Configs";

class UserSender {
  private path = "/user";

  sendToAuthUser = async (user: UserDTO): Promise<{ token: string }> => {
    let url: string = serverOrigin + this.path + "/auth";

    let response = await Sender.sendRequest({
      url: url,
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.object;
  };

  sendToGetUserInfo = async (): Promise<UserDTO> => {
    let url: string = serverOrigin + this.path + "/info";

    let response = await Sender.sendRequestWithAuthorization({
      url: url,
      method: "GET",
    });

    return response.object;
  };

  async sendToChangePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ) {
    let url: string = serverOrigin + this.path + "/change/password";

    let response = await Sender.sendRequestWithAuthorization({
      url: url,
      method: "POST",
      body: JSON.stringify({
        id: id,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.object;
  }

  async sendToChangeMail(id: string, newMail: string) {
    let url: string = serverOrigin + this.path + "/change/personalData";

    let response = await Sender.sendRequestWithAuthorization({
      url: url,
      method: "POST",
      body: JSON.stringify({
        id: id,
        mail: newMail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.object;
  }

  async sendToConfirmMail(userId: string): Promise<void> {
    let url: string = serverOrigin + this.path + "/mail/confirmation/" + userId;

    await Sender.sendRequest({
      url: url,
      method: "GET",
    });
  }

  async sendToDeleteUser(userId: string): Promise<void> {
    let url: string = serverOrigin + this.path + "/delete";

    await Sender.sendRequestWithAuthorization({
      url: url,
      method: "POST",
      body: userId,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async sendToCreateUser(user: UserDTO) {
    let url: string = serverOrigin + this.path + "/reg";

    await Sender.sendRequestWithAuthorization({
      url: url,
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new UserSender();
