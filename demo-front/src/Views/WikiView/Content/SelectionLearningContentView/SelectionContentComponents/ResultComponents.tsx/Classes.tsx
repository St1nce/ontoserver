import { NavLinkListDiv } from "Views/WikiView/Content/Components/NavLinkListDiv";

export const Classes: React.FC<{ classesIds: string[] }> = ({
  classesIds = [],
}) => {
  return (
    <NavLinkListDiv>
      {{
        label: "Классы",
        url: "/wiki/class/",
        dataList: classesIds,
      }}
    </NavLinkListDiv>
  );
};
