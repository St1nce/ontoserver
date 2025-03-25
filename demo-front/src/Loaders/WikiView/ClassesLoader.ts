import { AsideElementDTO } from "DTO/WikiView/AsideElementDTO";
import { ClassDTO, EmptyClassDTO } from "DTO/WikiView/ClassDTO";
import ClassSender from "Senders/WikiView/ClassSender";
import { mainStore } from "Stores/MainStore";
import { TypeAside } from "Stores/WikiView/AsideStore";
import { Params } from "react-router-dom";

export const loadAllClasses = async (): Promise<AsideElementDTO[]> => {
  mainStore.asideStore.changeType(TypeAside.classAside);
  return ClassSender.sendToGetAllClasses();
};

export const loadClassInfo = async ({
  params,
}: {
  params: Params<string>;
}): Promise<ClassDTO> => {
  return ClassSender.sendToGetClassInfo(
    params.classId ? params.classId! : ""
  ).then((classData) => {
    classData.annotations = new Map(Object.entries(classData.annotations));

    return new ClassDTO(classData);
  });
};

export const loadEmptyClassInfo = async (): Promise<ClassDTO> => {
  return new EmptyClassDTO();
};
