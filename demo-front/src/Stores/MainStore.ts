import { makeAutoObservable } from "mobx";
import { asideStore, AsideStore } from "./WikiView/AsideStore";
import { IndividualStore } from "./WikiView/IndividualStore";
import { ClassStore } from "./WikiView/ClassStore";
import { UserStore } from "./UserStore";
import { AuthStore } from "./AuthStore";
import { EmptyUserDTO } from "DTO/UserDTO";
import { SelectionLCStore } from "./WikiView/SelectionLearningContentStore";
import { RegistrationStore } from "./RegistrationStore";

export class MainStore {
  // хранилища
  asideStore: AsideStore;
  classStore: ClassStore;
  individualStore: IndividualStore;
  userStore: UserStore;
  authStore: AuthStore;
  selectionLCStore: SelectionLCStore;
  registrationStore: RegistrationStore;

  // всплывающие окна
  isAuthShow: boolean = false;
  isRegistrationShow: boolean = false;
  isDeleteClassShow: boolean = false;
  isDeleteIndividualShow: boolean = false;
  isDeleteUserShow: boolean = false;
  deletedEntity: any;

  constructor() {
    makeAutoObservable(this);
    this.asideStore = asideStore;
    this.classStore = new ClassStore(this);
    this.individualStore = new IndividualStore(this);
    this.selectionLCStore = new SelectionLCStore();
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore();
    this.registrationStore = new RegistrationStore();
    this.deletedEntity = {};
  }

  showAuthView = async (): Promise<void> => {
    this.userStore.user = new EmptyUserDTO();
    this.isAuthShow = true;
  };

  closeAuthView = async (): Promise<void> => {
    this.isAuthShow = false;
  };

  showRegistrationView = (): void => {
    this.isRegistrationShow = true;
  };

  closeRegistrationView = (): void => {
    this.isRegistrationShow = false;
  };

  showDeleteClassView = async (classId: string): Promise<void> => {
    this.isDeleteClassShow = true;
    this.deletedEntity = { id: classId };
  };

  showDeleteIndividualView = async (individualId: string): Promise<void> => {
    this.isDeleteIndividualShow = true;
    this.deletedEntity = { id: individualId };
  };

  showDeleteUserView = async (userId: string, mail: string): Promise<void> => {
    this.isDeleteUserShow = true;
    this.deletedEntity = { id: userId, mail: mail };
  };

  closeDeleteView = async (): Promise<void> => {
    this.isDeleteClassShow = false;
    this.isDeleteIndividualShow = false;
    this.isDeleteUserShow = false;
    this.deletedEntity = {};
  };
}

export const mainStore = new MainStore();
