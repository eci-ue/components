export enum View {
  innter = 0,
  outer = 1,
}

export class TaskFileStage {
  catUrl: string = "";
  rate: number = 0; // 完成进度
  current: boolean = false;
  online: boolean = false;
  resourceName: string = "";
  status: number = 0;
  subType: string = "";
  workLoad: number = 0;
}

export class TaskFileItem {
  lqrIndex: number = 1;
  lqrName: string = "";
  lqrData?: object;
  lqrVisitPath: string = "";
  bilingualFileId!: string | number; // 文件ID
  bilingualFileName: string = "";
  taskBilingualFileStageRspList: TaskFileStage[] = []
}