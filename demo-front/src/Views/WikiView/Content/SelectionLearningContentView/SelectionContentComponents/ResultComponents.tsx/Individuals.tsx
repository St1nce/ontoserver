import { NavLinkListDiv } from "Views/WikiView/Content/Components/NavLinkListDiv";


export const Individuals: React.FC<{ individualsIds: string[] }> = ({
    individualsIds  = [],
}) => {
  return (
    <NavLinkListDiv>
      {{
        label: "Экземпляры",
        url: "/wiki/individual/",
        dataList: individualsIds,
      }}
    </NavLinkListDiv>
  );
};