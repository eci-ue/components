export enum Skin {
  horizontal = "horizontal",
  vertical = "vertical"
}

//task操作按钮
export enum DoOperation {
  delete = "delete",
  interrupt = "interrupt",
  confirm = "confirm",
  reject = "reject",
  hedge = "hedge JAS",
  cancel = "cancel",
  partner = "rate partner",
  submit = "submit",
  instruction = "instruction",
  edit = "edit",
}

export class ResourceType {
  resourceId!: string | number; //资源id
  resourceName!: string //资源名称
}

//合作伙伴评价
export interface RatePartner extends ResourceType {
  addToFavorite?: number,//是否为喜欢资源 0-否，1-是
  deliveryOnTime?: number, //准时完成 0-否，1-是
  innerOuterType?: number, //任务类型 0-内部，1-外部
  noQualityAccident?: number, //无质量问题 0-否，1-是
  proactiveCooperation?: number, //积极合作 0-否，1-是
  addToClientResourcePool?: number, //是否添加客户资源池 0-否，1-是
  impression?: string, //评价/印象
  taskId?: string | number, //任务id
}

export interface itemType extends ResourceType {
  taskId: string | number,//任务ID
  id?: string | number,
  innerOuterType?: number,//任务类型 0-内部，1-外部
  status?: number,
  commentRequest?: string,
  workInstructionList?: string[],
  attachments?: FileType[],
  [key: string]: any
}

export class FileType {
  fileName: string = ""; // 文件名称
  fileType?: string = ""; // 文件类型（文件后缀）
  size?: number;     // 文件大小
  storagePath: string = ""; // 文件路径
}
export class SubmitType {
  rate: number = 0;
  taskId!: number;
  attachment!: FileType[];
}
export enum Status {
  inProgress = 2,//2:资源确认接受任务，正在完成
  interupted,//3:pm发出中断，任务处于中断中
}

export class InterruptRate {
  rate: number = 0;
  isUse: number = 0; //1=是、0=否
}

//Rate the partner
export enum RatePartnerList {
  proactive = "proactiveCooperation",
  accident = "noQualityAccident",
  delivery = "deliveryOnTime",
  favorite = "addToFavorite",
  pool = "addToClientResourcePool",
}