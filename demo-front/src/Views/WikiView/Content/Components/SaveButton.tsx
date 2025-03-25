import { observer } from "mobx-react";

export const SubmitButton: React.FC<{ children: string }> = observer(
  ({ children }) => {
    return (
      <div className="div-submit-button">
        <button className="primary" type="submit">{children}</button>
      </div>
    );
  }
);
