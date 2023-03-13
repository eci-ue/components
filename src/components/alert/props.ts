
export class TaskInterruptType {
  interruptReason: string;
  isInterrupted: boolean;
  constructor (reason: string = "", status: boolean = false) {
    this.interruptReason = reason;
    this.isInterrupted = status;
  }
}