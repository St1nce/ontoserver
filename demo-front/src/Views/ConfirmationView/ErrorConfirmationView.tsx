import React from "react";

export const ErrorConfirmationView: React.FC<{}> = () => {
  return (
    <div className="main-content">
      <h1>Не удалось подтвердить почту</h1>
      <p style={{ textAlign: "center" }}>
        Произошла ошибка при подтверждении почты. Попробуйте в другой раз.
      </p>
    </div>
  );
};
