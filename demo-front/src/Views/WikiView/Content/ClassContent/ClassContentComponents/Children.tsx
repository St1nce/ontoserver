import { ClassStore } from "Stores/WikiView/ClassStore";
import { NavLinkListDiv } from "../../Components/NavLinkListDiv";

export const Children: React.FC<{ classStore: ClassStore }> = ({
  classStore,
}) => {
  return (
    <NavLinkListDiv>
      {{
        label: "Дочерние классы",
        url: "/wiki/class/",
        dataList: classStore.classDataStore.childrenIds,
      }}
    </NavLinkListDiv>
  );
};
