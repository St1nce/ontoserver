import { DataPropertyDTO } from "DTO/WikiView/DataPropertyDTO";
import DataPropertySender from "Senders/WikiView/DataPropertySender";

export const loadAllDataProperties = async (domainId: string): Promise<
  DataPropertyDTO[]
> => {
  return DataPropertySender.sendToGetAllDataProperties(domainId);
};
