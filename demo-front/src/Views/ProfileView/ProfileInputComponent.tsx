import { ChangeEvent } from "react";

export const ProfileInputComponent: React.FC<{
  children: {
    label: string;
    type?: string;
    defaultValue?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
}> = ({ children }) => {
  return (
    <div className="inputLine">
      <label>{children.label}:</label>
      <input
        defaultValue={children.defaultValue ? children.defaultValue : ""}
        type={children.type}
        onChange={children.onChange}
      ></input>
    </div>
  );
};
