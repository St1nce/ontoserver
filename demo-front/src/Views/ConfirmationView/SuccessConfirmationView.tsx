import React from "react";

export const SuccessConfirmationView: React.FC<{}> = ({}) => {
  return (
    <div className="main-content">
        <h1>Успешное подтверждение почты</h1>
        <p style={{textAlign: "center"}}>Вы успешно подтвердили почту, теперь вы можете зайти в систему как администратор.</p>
    </div>
  );
};