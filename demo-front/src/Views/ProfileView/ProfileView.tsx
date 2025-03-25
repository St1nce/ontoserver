import { MainStore } from "Stores/MainStore";
import { UserStore } from "Stores/UserStore";
import { Title } from "Views/WikiView/Content/Components/Title";
import { inject } from "mobx-react";
import { useState } from "react";
import { ProfileInputComponent } from "./ProfileInputComponent";
import { SubmitButton } from "Views/WikiView/Content/Components/SaveButton";
import { useLoaderData } from "utils/route/UseLoaderData";
import { UserDTO } from "DTO/UserDTO";
import "./ProfileView.css";
import { Await } from "react-router-dom";
import React from "react";

const UserForm: React.FC<{
  userStore: UserStore;
}> = ({ userStore }) => {
  let [isPasswordChangeShow, changeShowPasswordChange] = useState(false);
  let [isDataChanged, setIsDataChanged] = useState(false);

  return (
    <form className="profile main-content" onSubmit={userStore.changeUser}>
      <Title contentStore={userStore} />
      <div>
        <ProfileInputComponent>
          {{
            label: "Почта",
            defaultValue: userStore.user.mail,
            onChange: (e) => {
              userStore.changeNewMail(e);
              setIsDataChanged(true);
            },
          }}
        </ProfileInputComponent>
      </div>
      <div className="pwd-div">
        <button
          type="button"
          className="button-a"
          onClick={() => changeShowPasswordChange(true)}
        >
          Изменить пароль
        </button>
        {isPasswordChangeShow && (
          <>
            <ProfileInputComponent>
              {{
                label: "Старый пароль",
                type: "password",
                onChange: (e) => {
                  userStore.changeOldPassword(e);
                  setIsDataChanged(true);
                },
              }}
            </ProfileInputComponent>
            <ProfileInputComponent>
              {{
                label: "Новый пароль",
                type: "password",
                onChange: (e) => {
                  userStore.changeNewPassword(e);
                  setIsDataChanged(true);
                },
              }}
            </ProfileInputComponent>
            <ProfileInputComponent>
              {{
                label: "Повторите новый пароль",
                type: "password",
                onChange: (e) => {
                  userStore.changeConfirmNewPassword(e);
                  setIsDataChanged(true);
                },
              }}
            </ProfileInputComponent>
          </>
        )}
      </div>
      {isDataChanged && <SubmitButton>Сохранить</SubmitButton>}
      <div>
        <button
          type="button"
          className="button-a"
          onClick={userStore.showDeleteView}
        >
          Удалить аккаунт
        </button>
      </div>
    </form>
  );
};

const ProfileView: React.FC<{
  userStore?: UserStore;
}> = ({ userStore }) => {
  let userPromise = useLoaderData<{ loadUserInfo: Promise<UserDTO> }>();

  if (userStore instanceof UserStore) {
    return (
      <React.Suspense>
        <Await resolve={userPromise.loadUserInfo}>
          {(user) => {
            userStore.setUser(user);
            return <UserForm userStore={userStore} />;
          }}
        </Await>
      </React.Suspense>
    );
  } else return <></>;
};

export default inject(({ store }: { store: MainStore }) => ({
  userStore: store.userStore,
}))(ProfileView);
