import { ReactElement } from "react";

export const ModalBody: React.FC<{
  children: ReactElement[];
}> = ({ children }) => {
  return <div className="modal-body">{children.map((child) => child)}</div>;
};
