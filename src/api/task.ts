/**
 * @file Task
 * @author theresia@eci.com
 */

import _ from "lodash-es";
import { validate, required, get, tryError, post } from "@js-lion/api";

export default class Task {
 /**
   * 获取项目的前置任务是否完成
   * @param projectId 项目ID
   * @returns 
   */
 @tryError(false)
 @post("/:task/task/getPreTask")
 @validate
 getPreTask(@required projectId: string | number): Promise<Boolean> {
   const params = { projectId };
   return { params } as any;
 }
  
  //合作伙伴评价
  @tryError(false)
  @post("/:task/task/ratePartner/save")
  @validate
  saveRatePartner<D>(@required data: D): Promise<Boolean> {
    return { data } as any;
  }

  //生成平账任务
  @tryError(false)
  @get("/:task/task/hedgeJAS/:taskId")
  @validate
  hedgeJAS(@required taskId: string | number): Promise<Boolean> {
    const params = { taskId };
    return { params } as any;
  }

  //confirm
  @tryError(false)
  @get("/:task/task/confirm/:taskId")
  @validate
  confirm(@required taskId: string | number): Promise<Boolean> {
    const params = { taskId };
    return { params } as any;
  }

  //删除任务
  @tryError(false)
  @post("/:task/task/delete")
  @validate
  deleteTask(@required taskId: string | number): Promise<Boolean> {
    const data = { taskId };
    return { data } as any;
  }
  
  //审批-取消
  @tryError(false)
  @get("/:task/task/cancel/:taskId")
  @validate
  cancelTask(@required taskId: string | number): Promise<Boolean> {
    const params = { taskId };
    return { params } as any;
  }
  
  //任务-审批-拒绝
  @tryError(false)
  @get("/:task/task/reject/:taskId")
  @validate
  rejectTask(@required taskId: string | number): Promise<Boolean> {
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
   @post("/:task/task/interrupt")
   @validate
   addInterupt(@required taskId: string | number, reason: string = "") {
     const data = { id: taskId, reason };
     return { data } as any;
   }

}