export interface ContentStoreApi {
  showDeleteView?: () => void;
  canBeDeleted: boolean;
  contentTitle: string;
}
