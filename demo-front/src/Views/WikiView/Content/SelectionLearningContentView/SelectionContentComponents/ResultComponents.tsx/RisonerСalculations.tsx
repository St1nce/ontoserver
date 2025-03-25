import { SelectionLCStore } from "Stores/WikiView/SelectionLearningContentStore";
import React, { useState } from "react";
import { Await } from "react-router-dom";

export const RisonerCalculations: React.FC<{
  selectionLCStore: SelectionLCStore;
}> = ({ selectionLCStore }) => {
  let [isRisonerCalculationsShow, changeShowRisonerCalculations] =
    useState(false);

  return (
    <div>
      <button
        className="button-a"
        onClick={() => changeShowRisonerCalculations(true)}
      >
        Показать рассуждения решателя
      </button>
      {isRisonerCalculationsShow && (
        <React.Suspense>
          <Await
            resolve={selectionLCStore.getRisonerCalculations()}
            errorElement={
              <>
                <p style={{color: "red"}}>Функция не реализована</p>
              </>
            }
          >
            <textarea>{selectionLCStore.risonerCalculations}</textarea>
          </Await>
        </React.Suspense>
      )}
    </div>
  );
};
