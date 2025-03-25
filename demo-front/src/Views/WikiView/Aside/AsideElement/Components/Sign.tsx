import { AsideElementDTO } from "DTO/WikiView/AsideElementDTO";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";

const CaretRight: React.FC<{
  onClick?: MouseEventHandler<HTMLImageElement>;
}> = ({ onClick }) => {
  return <img onClick={onClick} src="/img/caret-right.svg" />;
};
const CaretDown: React.FC<{
  onClick?: MouseEventHandler<HTMLImageElement>;
}> = ({ onClick }) => {
  return <img onClick={onClick} src="/img/caret-down.svg" />;
};
const Circle: React.FC<{
  onClick?: MouseEventHandler<HTMLImageElement>;
}> = ({ onClick }) => {
  return <img onClick={onClick} src="/img/circle.svg" />;
};

export const WikiAsideElementSign: React.FC<{
  asideElementChilden?: AsideElementDTO[];
  childrenVisibility: boolean;
  setChildrenVisibility: Dispatch<SetStateAction<boolean>>;
}> = ({ asideElementChilden, childrenVisibility, setChildrenVisibility }) => {
  if (Array.isArray(asideElementChilden) && asideElementChilden.length) {
    if (childrenVisibility)
      return (
        <CaretDown
          onClick={() => {
            setChildrenVisibility(!childrenVisibility);
          }}
        ></CaretDown>
      );
    else {
      return (
        <CaretRight
          onClick={() => {
            setChildrenVisibility(!childrenVisibility);
          }}
        ></CaretRight>
      );
    }
  } else {
    return <Circle />;
  }
};
