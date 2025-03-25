import { ClassStore } from "Stores/WikiView/ClassStore";
import { NavLinkListDiv } from "../../Components/NavLinkListDiv";

export const Individuals: React.FC<{ classStore: ClassStore }> = ({
  classStore,
}) => {
  return (
    <NavLinkListDiv>
      {{
        label: "Экземпляры",
        url: "/wiki/individual/",
        dataList: classStore.classDataStore.individualsIds,
      }}
    </NavLinkListDiv>
  );
};
