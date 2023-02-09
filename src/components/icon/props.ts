import type { DefineComponent } from "vue"

export class Props {
  type!: string | DefineComponent;
  size?: string | number;
  class: string = "";
  color: string = "";
}