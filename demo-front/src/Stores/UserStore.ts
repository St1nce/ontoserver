import { EmptyUserDTO, UserDTO } from "DTO/UserDTO";
import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { ContentStoreApi } from "./WikiView/API/ContentStore";
import UserSender from "Senders/UserSender";
import { MainStore } from "./MainStore";

export class UserStore implements ContentStoreApi {
  public user: UserDTO;
  public canBeDeleted: boolean = true;
  private oldPassword: string = "";
  private newPassword: string = "";
  private confirmNewPassword: string = "";
  private newMail: string = "";
  private root: MainStore;

  constructor(root: MainStore) {
    this.user = new EmptyUserDTO();
    this.root = root;
    makeAutoObservable(this);
  }

  changeUserMail = (event: ChangeEvent<HTMLInputElement>) => {
    this.user.mail = event.currentTarget.value;
  };

  changeUserPassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.user.password = event.currentTarget.value;
  };

  changeNewMail = (event: ChangeEvent<HTMLInputElement>) => {
    this.newMail = event.currentTarget.value;
  };

  changeOldPassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.oldPassword = event.currentTarget.value;
  };

  changeNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.newPassword = event.currentTarget.value;
  };

  changeConfirmNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.confirmNewPassword = event.currentTarget.value;
  };

  contentTitle = "Личный кабинет администратора";

  showDeleteView = (): void => {
    this.root.showDeleteUserView(this.user.id!, this.user.mail);
  };

  setUser(user: UserDTO) {
    this.user.id = user.id;
    this.user.mail = user.mail;
  }

  delete = (userId: string): void => {
    UserSender.sendToDeleteUser(userId)
      .then(() => {
        alert("Пользователь успешно удален");
        this.root.authStore.exit();
      })
      .catch((error) => {
        alert(error);
      });
  };

  changeUser = (event: any): void => {
    event.preventDefault();

    if (this.newMail !== "" && this.newMail !== this.user.mail) {
      UserSender.sendToChangeMail(this.user.id!, this.newMail)
        .then(() => {
          alert("Пользователь успешно поменял почту");
        })
        .catch((error) => {
          alert(error);
        });
    }

    if (this.newPassword !== "") {
      if (this.newPassword !== this.confirmNewPassword)
        alert("Новый пароль не совпадает со своим повтором.");
      else
        UserSender.sendToChangePassword(
          this.user.id!,
          this.oldPassword,
          this.newPassword
        )
          .then(() => {
            alert("Пользователь успешно поменял пароль");
          })
          .catch((error) => {
            alert(error);
          });
    }
  };
}
