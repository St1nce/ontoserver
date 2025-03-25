import { ChangeEvent } from "react";

export class Create {
  protected id: string = "";

  changeId(event: ChangeEvent<HTMLInputElement>) {
    this.id = event.currentTarget.value;
  }

  get createTitle(): string {
    return "Идентификатор: ";
  }

  get isNew(): boolean {
    return this.id === "";
  }
}
