import { SelectionLCStore } from "Stores/WikiView/SelectionLearningContentStore";
import Columns from "../../Components/Columns";
import { DataPropertyValueComponent } from "./DataPropertyValueCpmponent";
import { DataPropertyDTO } from "DTO/WikiView/DataPropertyDTO";

export const DataProperties: React.FC<{
  selectionLCStore: SelectionLCStore;
}> = ({ selectionLCStore }) => {
  return (
    <div>
      <label>Атрибуты:</label>

      <div className="divValue">
        <Columns maxColumnWidth={400}>
          {selectionLCStore.allDataProperties.map(
            (dataProperty: DataPropertyDTO) => {
              return (
                <DataPropertyValueComponent
                  key={"DataPropertyValue" + Date.now() + dataProperty.id}
                  id={dataProperty.id}
                  dataProperty={dataProperty}
                  selectionLCStore={selectionLCStore}
                />
              );
            }
          )}
        </Columns>
      </div>
    </div>
  );
};
