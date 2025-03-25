import { ReactElement } from "react";

export const ModalFooter: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  return <div className="modal-footer">{children}</div>;
};
