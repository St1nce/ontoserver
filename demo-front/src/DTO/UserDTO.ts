export class UserDTO {
  id?: string;
  mail: string;
  password: string;

  constructor(userData: { mail: string; password: string }) {
    this.mail = userData.mail;
    this.password = userData.password;
  }
}

export class EmptyUserDTO extends UserDTO {
  constructor() {
    super({
      mail: "",
      password: "",
    });
  }
}
