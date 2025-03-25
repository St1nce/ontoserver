import { inject, observer } from "mobx-react";
import { MainStore } from "Stores/MainStore";
import { Modal } from "Components/Modal";
import { ModalHeader } from "Components/ModalHeader";
import { ModalBody } from "Components/ModalBody";
import { ModalFooter } from "Components/ModalFooter";

const DeleteEntityView: React.FC<{ mainStore?: MainStore }> = ({
  mainStore,
}) => {
  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mainStore?.isDeleteClassShow)
      mainStore.classStore.delete(mainStore.deletedEntity.id);
    else if (mainStore?.isDeleteIndividualShow)
      mainStore?.individualStore.delete(mainStore.deletedEntity.id);
    else mainStore?.userStore.delete(mainStore.deletedEntity.id);
    mainStore?.closeDeleteView();
  };

  return (
    <Modal
      className="delete-modal"
      isShow={
        mainStore!.isDeleteClassShow ||
        mainStore!.isDeleteIndividualShow ||
        mainStore!.isDeleteUserShow
      }
      closeModal={mainStore!.closeDeleteView}
      submitModal={handleSubmit}
    >
      <ModalHeader closeModal={mainStore!.closeDeleteView}>
        {mainStore?.isDeleteClassShow
          ? "Удаление класса"
          : mainStore?.isDeleteIndividualShow
          ? "Удаление экземпляра"
          : mainStore?.isDeleteUserShow
          ? "Удаление пользователя"
          : ""}
      </ModalHeader>
      <ModalBody>
        <> </>
        <div className="inputLine">
          <input
            value={
              mainStore?.isDeleteUserShow
                ? mainStore?.deletedEntity.mail
                : mainStore?.deletedEntity.id
            }
            disabled
          ></input>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="primary green" type="submit">
          Удалить
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default inject(({ store }: { store: MainStore }) => ({
  mainStore: store,
}))(observer(DeleteEntityView));
