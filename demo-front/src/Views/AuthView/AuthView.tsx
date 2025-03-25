import { inject, observer } from "mobx-react";
import { MainStore } from "Stores/MainStore";
import { CloseDefaultButton } from "Components/IconButtons";
import { useEffect, useState } from "react";

const AuthView: React.FC<{ mainStore?: MainStore }> = ({ mainStore }) => {
  let showClass = mainStore?.isAuthShow ? "" : "offscreen";

  let loginRef: HTMLInputElement | null;
  let pwdRef: HTMLInputElement | null;

  const [login, setLogin] = useState("");

  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (loginRef) loginRef.value = "";
    if (pwdRef) pwdRef.value = "";
    setLogin("");
    setPwd("");
  }, [showClass]);

  useEffect(() => {
    setErrMsg("");
  }, [login, pwd]);

  let handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.currentTarget.value);
  };

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (login === "") {
      setErrMsg("Введите логин.");
      return;
    }

    if (pwd === "") {
      setErrMsg("Введите пароль.");
      return;
    }

    mainStore?.authStore
      .authorization(login, pwd)
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
    <>
      <div
        className={"modal-custom " + showClass}
        onClick={mainStore?.closeAuthView}
      >
        <div
          className="modal-fill"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-header">
              <div className="button-close">
                <CloseDefaultButton onClick={mainStore?.closeAuthView} />
              </div>
              <h2>Авторизация</h2>
            </div>

            <div className="modal-body">
              <div className="inputLine">
                <label> Логин: </label>
                <input
                  ref={(input) => (loginRef = input)}
                  type="email"
                  onChange={(e) => {
                    handleChange(e, setLogin);
                  }}
                  aria-errormessage="err-msg"
                ></input>
              </div>
              <div className="inputLine">
                <label> Пароль: </label>
                <input
                  ref={(input) => (pwdRef = input)}
                  type="password"
                  onChange={(e) => {
                    handleChange(e, setPwd);
                  }}
                ></input>
              </div>

              <p
                id="err-msg"
                className={errMsg ? "err-msg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
            </div>

            <div className="modal-footer">
              <button className="primary green" type="submit">
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default inject(({ store }: { store: MainStore }) => ({
  mainStore: store,
}))(observer(AuthView));
