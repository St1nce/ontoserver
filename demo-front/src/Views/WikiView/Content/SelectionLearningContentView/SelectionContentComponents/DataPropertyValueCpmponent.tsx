import { DataPropertyDTO } from "DTO/WikiView/DataPropertyDTO";
import { SelectionLCStore } from "Stores/WikiView/SelectionLearningContentStore";

const InputDataProperty: React.FC<{
  dataProperty: {
    id: string;
    type: string;
  };
  selectionLCStore: SelectionLCStore;
}> = ({ dataProperty, selectionLCStore }) => {
  return (
    <>
      <input
        type={selectionLCStore.converterType(dataProperty.type)}
        onChange={(e) =>
          selectionLCStore.changeDataProperty(e, dataProperty.id)
        }
      />
    </>
  );
};

export const DataPropertyValueComponent: React.FC<{
  dataProperty: DataPropertyDTO;
  selectionLCStore: SelectionLCStore;
  id: string;
}> = ({ dataProperty, selectionLCStore }) => {
  return (
    <InputDataProperty
      dataProperty={dataProperty}
      selectionLCStore={selectionLCStore}
    />
  );
};
