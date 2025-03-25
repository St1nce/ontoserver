import { FormEvent, ReactElement } from "react";

export const Modal: React.FC<{
  className?: string;
  isShow: boolean;
  closeModal: () => void;
  submitModal: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactElement[];
}> = ({ className = "", isShow, closeModal, submitModal, children }) => {
  let showClass = isShow ? "" : "offscreen";

  return (
    <>
      <div className={className + " modal-custom " + showClass} onClick={closeModal}>
        <div
          className="modal-fill"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <form onSubmit={submitModal} noValidate>
            {children.map((child) => child)}
          </form>
        </div>
      </div>
    </>
  );
};
