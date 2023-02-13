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
  impression?: string, //评价/印象
  taskId?: string | number, //任务id
}

export interface RatePartner extends ResourceType {
  addToFavorite?: number,//是否为喜欢资源 0-否，1-是
  deliveryOnTime?: number, //准时完成 0-否，1-是
  innerOuterType?: number, //任务类型 0-内部，1-外部
  noQualityAccident?: number, //无质量问题 0-否，1-是
  proactiveCooperation?: number, //积极合作 0-否，1-是
  impression?: string, //评价/印象
  taskId?: string | number, //任务id
}