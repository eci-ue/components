/**
 * @file Task
 * @author theresia@eci.com
 */

import * as _ from "lodash-es";
import i18n from "../utils/i18n";
import { $error, $success } from "@ue/message";
import { validate, required, get, post, tryError } from "@js-lion/api";
import { $debounce } from "@ue/utils";
import { TaskInterruptType } from "../components/alert/props";
import { InterruptRate } from "../components/operate/type";

export default class Task {
  /**
    * 获取项目的前置任务是否完成
    * @param projectId 项目ID
    * @returns 
    */
  @tryError(true)
  @post("/:task/task/getPreTask")
  @validate
  getPreTask(@required projectId: string | number): Promise<boolean> {
    const params = { projectId };
    return { params } as any;
  }

  /**
   * 获取议员端任务是否中断接口
   * @param taskId 任务ID
   */
  @tryError(new TaskInterruptType())
  @post("/:task/task/isTaskInterrupted")
  @validate
  isTaskInterrupted<T>(@required taskId: string | number): Promise<T> {
    const data = { taskId };
    return { data } as any;
  }

  //合作伙伴评价
  @tryError(false)
  @$error()
  @$success(i18n.message.SAVED_SUCCESSFULLY)
  @post("/:task/task/ratePartner/save")
  @validate
  saveRatePartner<D>(@required data: D): Promise<boolean> {
    return { data } as any;
  }

  //生成平账任务
  @tryError(false)
  @$error()
  @$success(i18n.message.SAVED_SUCCESSFULLY)
  @get("/:task/task/hedgeJAS/:taskId")
  @validate
  hedgeJAS(@required taskId: string | number): Promise<boolean> {
    const params = { taskId };
    return { params } as any;
  }

  //confirm
  @tryError(false)
  @$error()
  @$success(i18n.message.CONFIRM_SUCCESSFULLY)
  @get("/:task/task/confirm/:taskId")
  @validate
  confirm(@required taskId: string | number): Promise<boolean> {
    const params = { taskId };
    return { params } as any;
  }

  //删除任务
  @tryError(false)
  @$error()
  @$success(i18n.message.DELETE_SUCCESSFULLY)
  @post("/:task/task/delete")
  @validate
  deleteTask(@required taskId: string | number): Promise<boolean> {
    const data = { taskId };
    return { data } as any;
  }

  //审批-取消
  @tryError(false)
  @$error()
  @$success(i18n.message.CANCEL_SUCCESSFULLY)
  @get("/:task/task/cancel/:taskId")
  @validate
  cancelTask(@required taskId: string | number): Promise<boolean> {
    const params = { taskId };
    return { params } as any;
  }

  //任务-审批-拒绝
  @tryError(false)
  @$error()
  @$success(i18n.message.REJECT_SUCCESSFULLY)
  @get("/:task/task/reject/:taskId")
  @validate
  rejectTask(@required taskId: string | number): Promise<boolean> {
    const params = { taskId };
    return { params } as any;
  }

  /**
  * 终端任务
  * @param taskId 任务ID
  * @param reason 任务原因
  * @returns 
  */
  @tryError(false)
  @$error()
  @$success(i18n.message.INTERRUPT_SUCCESSFULLY)
  @post("/:task/task/interrupt")
  @validate
  addInterupt(@required taskId: string | number, reason: string = ""): Promise<boolean> {
    const data = { id: taskId, reason };
    return { data } as any;
  }

  //议员 页面-任务提交-中断提交前完成比例获取
  @tryError(new InterruptRate())
  @$error()
  @get("/:task/task/interrupt/rate/:taskId")
  @validate
  interruptRate(@required taskId: string | number): Promise<InterruptRate> {
    const params = { taskId };
    return { params } as any;
  }

  //议员 页面-任务提交-中断提交按钮接口
  @tryError(false)
  @$error()
  @$success(i18n.message.SUBMIT_SUCCESSFULLY)
  @post("/:task/task/interrupt/submit")
  @validate
  interruptSubmit<D>(@required data: D): Promise<boolean> {
    return { data } as any;
  }

  /**
* 页面-任务提交-详情页submit按钮接口
* @param taskId 任务ID
*/
  @$debounce()
  @tryError(false)
  @$error()
  @$success(i18n.message.SUBMIT_SUCCESSFULLY)
  @post("/:task/task/submit/:taskId")
  @validate
  submit(@required taskId: string | number): Promise<boolean> {
    const params = { taskId };
    return { params } as any;
  }

  //页面-获取中断提交的内容
  @tryError(false)
  @get("/:task/task/interrupt/submit/info/:taskId")
  @validate
  interruptInfo<T>(@required taskId: string | number): Promise<T> {
    const params = { taskId };
    return { params } as any;
  }
}