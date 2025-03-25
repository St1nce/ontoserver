import { DeleteDefaultButton } from "Components/IconButtons";
import { AuthStore } from "Stores/AuthStore";
import { ContentStoreApi } from "Stores/WikiView/API/ContentStore";
import React from "react";

export const Title: React.FC<{
  contentStore: ContentStoreApi;
  authStore?: AuthStore;
}> = ({ contentStore, authStore }) => {
  return (
    <h1>
      {contentStore.contentTitle}

      {authStore?.isAuth && contentStore.canBeDeleted && (
        <DeleteDefaultButton onClick={contentStore.showDeleteView} />
      )}
    </h1>
  );
};
