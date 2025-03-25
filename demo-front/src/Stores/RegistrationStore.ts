import { makeAutoObservable } from "mobx";
import { UserDTO } from "DTO/UserDTO";
import UserSender from "Senders/UserSender";

export class RegistrationStore {
  constructor() {
    makeAutoObservable(this);
  }

  registration(mail: string, password: string) {
    let user = new UserDTO({ mail: mail, password: password });

    return UserSender.sendToCreateUser(user).then(() => {
      alert("Пользователь успешно создан. Необходимо подтвердить почту");
    });
  }
}
