import { Create } from "Stores/WikiView/API/Create";
import { observer } from "mobx-react";

const Id: React.FC<{
  createStore: Create;
}> = ({ createStore }) => {
  return (
    <>
      {createStore.isNew && (
        <div>
          <label>
            {createStore.createTitle}
            <input defaultValue={""} onChange={createStore.changeId} required />
          </label>
        </div>
      )}
    </>
  );
};
export default observer(Id);
