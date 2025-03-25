import { AsideElementDTO } from "DTO/WikiView/AsideElementDTO";
import { EmptyIndividualDTO, IndividualDTO } from "DTO/WikiView/IndividualDTO";
import IndividualSender from "Senders/WikiView/IndividualSender";
import { mainStore } from "Stores/MainStore";
import { TypeAside } from "Stores/WikiView/AsideStore";
import { Params } from "react-router-dom";

export const loadAllIndividuals = async (): Promise<AsideElementDTO[]> => {
  mainStore.asideStore.changeType(TypeAside.individualAside);
  return IndividualSender.sendToGetAllIndividuals();
};

export const loadIndividualInfo = async ({
  params,
}: {
  params: Params<string>;
}): Promise<IndividualDTO> => {
  return IndividualSender.sendToGetIndividualInfo(
    params.individualId ? params.individualId! : ""
  ).then((individualData) => {
    individualData.objectPropertiesIdsWithValuesIds = new Map(
      Object.entries(individualData.objectPropertiesIdsWithValuesIds)
    );

    return new IndividualDTO(individualData);
  });
};

export const loadEmptyIndividualInfo = async (): Promise<IndividualDTO> => {
  return new EmptyIndividualDTO();
};
