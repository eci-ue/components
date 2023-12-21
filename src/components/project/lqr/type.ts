import safeGet from "@fengqiaogang/safe-get";

export class UploadLqr {
  fileId!: number | string;
  fileName?: string;
  level!: number; // 计算后得到的等级
  point!: number; // 输入的数字
  sampleWords!: number; // 抽样字数
  reportPath?: string;
  taskId!: number | string;
  constructor(value: object = {}) {
    this.fileName = safeGet<string>(value, "fileName");
    this.reportPath = safeGet<string>(value, "storagePath");
    if (safeGet<number>(value, "point")) {
      this.point = Number(safeGet<number>(value, "point"));
    }
    if (safeGet<number>(value, "level")) {
      this.level = Number(safeGet<number>(value, "level"));
    }
    this.taskId = safeGet<number | string>(value, "ttaskId") || "";
  }
}