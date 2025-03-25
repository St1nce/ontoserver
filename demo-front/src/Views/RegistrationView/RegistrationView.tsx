import { Modal } from "Components/Modal";
import { ModalBody } from "Components/ModalBody";
import { ModalFooter } from "Components/ModalFooter";
import { ModalHeader } from "Components/ModalHeader";
import { MainStore } from "Stores/MainStore";
import { ProfileInputComponent } from "Views/ProfileView/ProfileInputComponent";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import "./RegistrationView.css";

const RegistrationView: React.FC<{
  mainStore?: MainStore;
}> = ({ mainStore }) => {
  let mailRef: HTMLInputElement | null;
  let pwdRef: HTMLInputElement | null;
  let confirmPwdRef: HTMLInputElement | null;

  const [mail, setMail] = useState("");

  const [pwd, setPwd] = useState("");

  const [confirmPwd, setConfirmPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (mailRef) mailRef!.value = "";
    if (pwdRef) pwdRef!.value = "";
    if (confirmPwdRef) confirmPwdRef!.value = "";
    setMail("");
    setPwd("");
    setConfirmPwd("");
  }, [mainStore!.isRegistrationShow]);

  useEffect(() => {
    setErrMsg("");
  }, [mail, pwd, confirmPwd]);

  let handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.currentTarget.value);
  };

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mail === "") {
      setErrMsg("Введите почту.");
      return;
    }

    if (pwd === "") {
      setErrMsg("Введите пароль.");
      return;
    }

    if (confirmPwd === "") {
      setErrMsg("Введите копию пароля.");
      return;
    }

    if (pwd !== confirmPwd) {
      setErrMsg("Пароли не совпадают.");
      return;
    }

    mainStore?.registrationStore
      .registration(mail, pwd)
      .then(() => mainStore?.closeAuthView())
      .catch((err: any) => {
        let convertedErrMsg = "Не обработанная ошибка.";

        switch (err.status) {
          case 500: {
            switch (err.message) {
              case "Bad credentials": {
                convertedErrMsg = "Не верный логин или пароль.";
              }
            }
            break;
          }

          default: {
            convertedErrMsg = err.message;
          }
        }

        setErrMsg(convertedErrMsg);
      });
  };

  return (
    <Modal
      className="registration-modal"
      isShow={mainStore!.isRegistrationShow}
      closeModal={mainStore!.closeRegistrationView}
      submitModal={handleSubmit}
    >
      <ModalHeader closeModal={mainStore!.closeRegistrationView}>
        Регистрация
      </ModalHeader>
      <ModalBody>
        <ProfileInputComponent>
          {{
            label: "Почта",
            type: "email",
            onChange: (e) => handleChange(e, setMail),
          }}
        </ProfileInputComponent>
        <ProfileInputComponent>
          {{
            label: "Пароль",
            type: "password",
            onChange: (e) => handleChange(e, setPwd),
          }}
        </ProfileInputComponent>
        <ProfileInputComponent>
          {{
            label: "Копия пароля",
            type: "password",
            onChange: (e) => handleChange(e, setConfirmPwd),
          }}
        </ProfileInputComponent>
        <p
          id="err-msg"
          className={errMsg ? "err-msg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </ModalBody>
      <ModalFooter>
        <button className="primary green" type="submit">
          Зарегистрировать
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default inject(({ store }: { store: MainStore }) => ({
  mainStore: store,
}))(observer(RegistrationView));
