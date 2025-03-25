import React from "react";

interface ButtonIconPropsApi {
  id?: string;
  disabled?: boolean;
  icon: string;
  alt: string;
  onClick?: (event: any) => any;
}

export const IconDefaultButton: React.FC<ButtonIconPropsApi> = (
  props: ButtonIconPropsApi
) => {
  return (
    <button
      className="iconButtons"
      id={props.id}
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <img src={props.icon} alt={props.alt} />
    </button>
  );
};

interface ButtonClickPropsApi {
  id?: string;
  disabled?: boolean;
  onClick?: (event: any) => any;
}

export const UpdateDefaultButton: React.FC<ButtonClickPropsApi> = (
  props: ButtonClickPropsApi
) => {
  return (
    <IconDefaultButton
      onClick={props.onClick}
      icon="/img/pen.svg"
      alt="Изменить"
    />
  );
};

export const DeleteDefaultButton: React.FC<ButtonClickPropsApi> = (
  props: ButtonClickPropsApi
) => {
  return (
    <IconDefaultButton
      id={props.id}
      disabled={props.disabled}
      onClick={props.onClick}
      icon="/img/trash.svg"
      alt="Удалить"
    />
  );
};

export const SaveDefaultButton: React.FC<ButtonClickPropsApi> = (
  props: ButtonClickPropsApi
) => {
  return (
    <IconDefaultButton
      onClick={props.onClick}
      icon="/img/save.svg"
      alt="Сохранить"
    />
  );
};

export const AddDefaultButton: React.FC<ButtonClickPropsApi> = (
  props: ButtonClickPropsApi
) => {
  return (
    <IconDefaultButton
      onClick={props.onClick}
      icon="/img/plus.svg"
      alt="Добавить"
    />
  );
};

export const ShowDefaultButton: React.FC<ButtonClickPropsApi> = (
  props: ButtonClickPropsApi
) => {
  return (
    <IconDefaultButton
      id={props.id}
      onClick={props.onClick}
      icon="/img/arrow-down.svg"
      alt="Расскрыть"
    />
  );
};

export const CloseDefaultButton: React.FC<ButtonClickPropsApi> = (
  props: ButtonClickPropsApi
) => {
  return (
    <IconDefaultButton
      id={props.id}
      onClick={props.onClick}
      icon="/img/x.svg"
      alt="Закрыть"
    />
  );
};
