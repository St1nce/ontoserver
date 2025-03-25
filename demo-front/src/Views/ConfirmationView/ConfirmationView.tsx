import React from "react";
import { Await } from "react-router-dom";
import { useLoaderData } from "utils/route/UseLoaderData";
import { SuccessConfirmationView } from "./SuccessConfirmationView";
import { ErrorConfirmationView } from "./ErrorConfirmationView";

export const ConfirmationView: React.FC<{}> = ({}) => {
  let confirmationPromise = useLoaderData<{
    loadConfirmation: Promise<boolean>;
  }>();

  return (
    <React.Suspense>
      <Await resolve={confirmationPromise.loadConfirmation} errorElement={<ErrorConfirmationView />}>
        {(confirmation) => {
          if (confirmation) return <SuccessConfirmationView />;
        }}
      </Await>
    </React.Suspense>
  );
};
