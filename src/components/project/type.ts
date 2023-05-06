export class AmountItemData {
  id!: number;          // 任务ID
  discount: number = 0;
  unitPrice: number = 0; // 费率
  words: number = 0;     // 字数
  subTotal: number = 0;  // 小计
}

export enum Status {
  pending = 1, // 任务分配，待资源确认
  inProgress = 2,  // 资源确认接受任务，正在完成
  inInterrupt = 3, // PM 发出中断，任务处于中断中
  submitted = 4,   // 资源完成任务后提交，待PM审核
  submittedInterrupt = 5, // 任务中断后，资源提交，待PM审核
  confirmed = 6,   // 资源完成任务后提交，PM确认
  confirmedInterrupt = 7, // 任务中断后，资源提交，PM确认
}

export const taskPhaseList = [
  "Repetitions", 
  "101% Match",
  "100% Match",
  "95% - 99%",
  "85% - 94%",
  "75% - 84%",
  "50% - 74%",
  "New"
];