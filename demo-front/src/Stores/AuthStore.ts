import { makeAutoObservable } from "mobx";
import { UserDTO } from "DTO/UserDTO";
import UserSender from "Senders/UserSender";
import AccessSender from "Senders/AccessSender";

export class AuthStore {
  public isAuth: boolean;

  constructor() {
    this.isAuth = false;
    makeAutoObservable(this);
  }

  authorization = async (login: string, password: string) => {
    let user = new UserDTO({ mail: login, password: password });

    return UserSender.sendToAuthUser(user)
      .then(({ token }) => {
        window.localStorage.setItem("auth", token);
        this.isAuth = true;
      })
      .catch((err) => {
        window.localStorage.removeItem("auth");
        this.isAuth = false;
        throw err;
      });
  };

  exit = () => {
    window.localStorage.removeItem("auth");
    this.isAuth = false;
  };

  checkAccess(): Promise<boolean> {
    return AccessSender.sendToGetAccess()
      .then(() => {
        this.isAuth = true;
        return true;
      })
      .catch(() => {
        this.isAuth = false;
        return false;
      });
  }
}
