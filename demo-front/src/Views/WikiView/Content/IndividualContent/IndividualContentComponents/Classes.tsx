import { IndividualStore } from "Stores/WikiView/IndividualStore";
import { NavLinkListDiv } from "../../Components/NavLinkListDiv";

export const Classes: React.FC<{ individualStore: IndividualStore }> = ({
  individualStore,
}) => {
  return (
    <NavLinkListDiv>
      {{
        label: "Классы",
        url: "/wiki/class/",
        dataList: individualStore.individual.classesIds,
      }}
    </NavLinkListDiv>
  );
};
