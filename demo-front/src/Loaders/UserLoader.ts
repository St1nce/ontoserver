import { UserDTO } from "DTO/UserDTO";
import UserSender from "Senders/UserSender";
import { Params } from "react-router-dom";

export const loadUserInfo = async (): Promise<UserDTO> => {
  return UserSender.sendToGetUserInfo();
};

export const loadConfirmation = async ({
  params,
}: {
  params: Params<string>;
}): Promise<boolean> => {
  return UserSender.sendToConfirmMail(params.confirmationId ? params.confirmationId! : "").then(
    () => {
      return true;
    }
  );
};
