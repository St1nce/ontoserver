import { AsideElementDTO } from "DTO/WikiView/AsideElementDTO";
import { Dispatch, SetStateAction, useState } from "react";
import "./AsideElement.css";
import { WikiAsideElementSign } from "./Components/Sign";
import StyledNavLink from "StyledComponents/StyledNavLink";

export const WikiAsideElement: React.FC<{ asideElement: AsideElementDTO }> = ({
  asideElement,
}) => {
  let [childrenVisibility, setChildrenVisibility]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);

  return (
    <div className="aside-element">
      <p>
        <WikiAsideElementSign
          asideElementChilden={asideElement.children}
          childrenVisibility={childrenVisibility}
          setChildrenVisibility={setChildrenVisibility}
        />
        <StyledNavLink to={"./" + asideElement.id} relative="route">{asideElement.id}</StyledNavLink>
      </p>

      {childrenVisibility &&
        asideElement.children?.map((child) => (
          <WikiAsideElement key={child.id} asideElement={child} />
        ))}
    </div>
  );
};
