export class AmountItemData {
  id!: number;          // 任务ID
  discount: number = 0;
  unitPrice: number = 0; // 费率
  words: number = 0;     // 字数
  subTotal: number = 0;  // 小计
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