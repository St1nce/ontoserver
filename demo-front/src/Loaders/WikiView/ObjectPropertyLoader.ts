import { ObjectPropertyDTO } from "DTO/WikiView/ObjectPropertyDTO";
import ObjectPropertySender from "Senders/WikiView/ObjectPropertySender";

export const loadAllObjectProperties = async (domainId: string): Promise<
  ObjectPropertyDTO[]
> => {
  return ObjectPropertySender.sendToGetAllObjectProperties(domainId);
};
