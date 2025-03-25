import { NavLinkList } from "./NavLinkList";

export const NavLinkListDiv: React.FC<{
  children: { label: string; url: string; dataList: string[] };
}> = ({ children }) => {
  return (
    <div>
      <label>{children.label}:</label>
      <div className="divValue">
        <NavLinkList url={children.url} dataList={children.dataList} />
      </div>
    </div>
  );
};
