import { Await } from "react-router-dom";
import { Classes } from "./ResultComponents.tsx/Classes";
import { Individuals } from "./ResultComponents.tsx/Individuals";
import { RisonerCalculations } from "./ResultComponents.tsx/RisonerСalculations";
import React from "react";
import { SelectionLCStore } from "Stores/WikiView/SelectionLearningContentStore";
import { observer } from "mobx-react";

export const ResultDiv: React.FC<{ selectionLCStore: SelectionLCStore }> =
  observer(({ selectionLCStore }) => {
    if (selectionLCStore.isResultShow)
      return (
        <React.Suspense>
          <Await resolve={selectionLCStore.getResult()}>
            {(result) => {
              return (
                <>
                  <h2>Результат: </h2>
                  <Classes classesIds={result.classesIds} />
                  <Individuals individualsIds={result.individualsIds} />
                  <RisonerCalculations selectionLCStore={selectionLCStore} />
                </>
              );
            }}
          </Await>
        </React.Suspense>
      );
    else return <></>;
  });
