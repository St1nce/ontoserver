import { NavLink } from "react-router-dom";

export const Logo: React.FC<{}> = () => {
  return (
    <NavLink className="logo" to={"/"}>
      <p>LearnerContent</p>
    </NavLink>
  );
};
