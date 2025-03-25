import { CloseDefaultButton } from "./IconButtons";

export const ModalHeader: React.FC<{
  closeModal: () => void;
  children: string;
}> = ({ closeModal, children }) => {
  return (
    <div className="modal-header">
      <div className="button-close">
        <CloseDefaultButton onClick={closeModal} />
      </div>
      <h2>{children}</h2>
    </div>
  );
};
