import { ReactElement } from "react";

const Column: React.FC<{
  children: ReactElement<{id: string}>[];
  maxWidth: number;
}> = ({ children, maxWidth }) => {
  return (
    <div className="column-div" style={{ maxWidth: maxWidth }}>
      {children.map((child) => (
        <div className="inputLine" key={"Column" + child.props.id}>
          <label>{child.props.id}:</label>
          {child}
        </div>
      ))}
    </div>
  );
};

export default Column;
