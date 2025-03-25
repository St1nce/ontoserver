import { AsideElementDTO } from "DTO/WikiView/AsideElementDTO";
import { LC_FORM_ID } from "LCConstants";
import Fuse from "fuse.js";
import {
  IObservableArray,
  computed,
  makeAutoObservable,
  observable,
  toJS,
} from "mobx";
import { ChangeEvent, ChangeEventHandler } from "react";

const options = {
  shouldSort: false,
  threshold: 0.2,
  keys: ["id"],
};

export enum TypeAside {
  none,
  classAside,
  individualAside,
}

export class AsideStore {
  private asideTreeData: IObservableArray<AsideElementDTO>;
  private fusePattern: string;
  private fuse: Fuse<AsideElementDTO>;
  public type: TypeAside;

  constructor() {
    this.asideTreeData = observable.array([]);
    this.fusePattern = "";
    this.fuse = new Fuse(this.asideTreeData, options);
    this.type = TypeAside.none;

    makeAutoObservable(this);
  }

  changeFusePattern(fusePattern: string) {
    this.fusePattern = fusePattern;
  }

  public changeType(typeAside: TypeAside) {
    this.type = typeAside;
  }

  private fuseTreeSearch = (tree: AsideElementDTO[]): AsideElementDTO[] => {
    let fuseTree: AsideElementDTO[] = [];

    this.fuse.setCollection(tree);

    let childrenFuseTrue = this.fuse
      .search(this.fusePattern)
      .map(({ item }) => item);

    fuseTree.push(...childrenFuseTrue);

    let childrenFuseFalse = tree.filter((el) => !childrenFuseTrue.includes(el));

    childrenFuseFalse.forEach((el) => {
      if (Array.isArray(el.children) && el.children.length) {
        let childrenFuseTree = this.fuseTreeSearch(el.children);

        if (Array.isArray(childrenFuseTree) && childrenFuseTree.length)
          fuseTree.push({ id: el.id, children: childrenFuseTree });
      }
    });

    return fuseTree;
  };

  @computed public get asideFuseTree(): AsideElementDTO[] {
    if (this.fusePattern !== "") {
      return this.fuseTreeSearch(toJS(this.asideTreeData));
    } else {
      return this.asideTreeData;
    }
  }

  @computed public get asideLC_FormFuseTree(): AsideElementDTO[] {
    return this.asideFuseTree.filter((asideElement) =>
      asideElement.classesIds?.includes(LC_FORM_ID)
    );
  }

  public setAsideTree(tree: AsideElementDTO[]): void {
    this.asideTreeData = observable.array(tree);
  }

  public get asideTitle(): String {
    switch (this.type) {
      case TypeAside.classAside:
        return "Иерархия классов";
      case TypeAside.individualAside:
        return "Экземпляры";
      default:
        return "";
    }
  }
}

export const asideStore = new AsideStore();
