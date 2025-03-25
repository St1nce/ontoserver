import { NavLink } from "react-router-dom";

export const NavLinkList: React.FC<{ url: string; dataList: string[] }> = ({
  url,
  dataList,
}) => {
  return (
    <p>
      {dataList.map((data, index) => (
        <em key={"link" + data + index}>
          <NavLink to={url + data}>{data}</NavLink>
          {index < dataList.length - 1 ? ", " : ""}
        </em>
      ))}
    </p>
  );
};
