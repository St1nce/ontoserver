import { ClassStore } from "Stores/WikiView/ClassStore";
import { NavLinkListDiv } from "../../Components/NavLinkListDiv";

export const Parents: React.FC<{ classStore: ClassStore }> = ({
  classStore,
}) => {
  return (
    <NavLinkListDiv>
      {{
        label: "Родительские классы",
        url: "/wiki/class/",
        dataList: classStore.classDataStore.parentsIds,
      }}
    </NavLinkListDiv>
  );
};
