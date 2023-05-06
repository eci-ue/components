import safeGet from "@fengqiaogang/safe-get";

export class UploadLqr {
  fileId!: number | string;
  fileName?: string;
  level!: number;
  point!: number;
  reportPath?: string;
  taskId!: number | string;
  constructor(value: object = {}) {
    this.fileName = safeGet<string>(value, "fileName");
    this.reportPath = safeGet<string>(value, "storagePath");
    if (safeGet<number>(value, "point")) {
      this.point = safeGet<number>(value, "point")!;
      this.level = safeGet<number>(value, "level")!;
    }
    this.taskId = safeGet<number | string>(value, "ttaskId") || "";
  }
}