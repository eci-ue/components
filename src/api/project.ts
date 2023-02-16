/**
 * @file 项目相关接口
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { PageResult } from "@ue/utils";
import { $error } from "@ue/message";
import { transformPairs } from "../utils";
import safeGet from "@fengqiaogang/safe-get";
import { FileType } from "../components/drive/props";
import { post, get, tryError, validate, required } from "@js-lion/api";


const getType = function (type: FileType) {
  return type
}

export default class Project {
  /**
   * 文件列表
   * @param id       项目ID
   * @param type     文件类型
   * @param language 语言ID
   * @returns 
   */
  @tryError(new PageResult<object>())
  @get("/:project/cat/file/:projectId")
  @validate
  fileList<T>(
    @required id: string | number,
    @required type: FileType,
    @required language: string | number
  ): Promise<PageResult<T>> {
    const params = {
      projectId: id,
      sourceLanguageId: language,
      type: getType(type),
    };
    const callback = function (list: T[]) {
      return _.map(list, function (data: object) {
        const value = _.get<object, string>(data, "languagePairs");
        const languagePairs = transformPairs<object>(value);
        return { ...data, languagePairs } as T;
      });
    };
    return { params, callback } as any;
  }



  /**
   * 将网盘文件上传到项目中
   * @param fileIds 
   * @param projectId 
   * @param fileType 
   * @param languageId 
   * @returns 
   */
  @tryError(false)
  @$error("Added failed, please contact administrator or try again later.")
  @post("/:project/cat/file/uploud/drive")
  @validate
  uploadDrive(
    @required fileIds: number | number[],
    @required projectId: string | number,
    @required fileType: FileType,
    @required languageId: string | number
  ): Promise<boolean> {
    const data = { fileIds, projectId, fileType: getType(fileType), sourceLanguageId: languageId };
    return { data } as any;
  }

  // 直接上传文件
  @tryError(false)
  @$error("Added failed, please contact administrator or try again later.")
  @post("/:project/cat/file/uploud/direct")
  @validate
  uploadDirect<D>(
    @required files: D | D[],
    @required projectId: string | number,
    @required fileType: FileType,
    @required languageId: string | number
  ): Promise<boolean> {
    const data = {
      projectId,
      fileType: getType(fileType),
      sourceFiles: _.concat(files),
      sourceLanguageId: languageId
    };
    return { data } as any;
  }


  // 删除文件
  @tryError(false)
  @$error("Delete failed, please contact administrator or try again later.")
  @post("/:project/cat/file/delete/:projectId")
  @validate
  removeFile(
    @required projectId: string | number,
    @required data: Array<string | number>
  ): Promise<boolean> {
    const params = { projectId };
    return { params, data } as any;
  }

  /**
   * 获取语言对
   * @param projectId 项目ID
   * @languageId 源语言ID
   */
  @tryError([])
  @get("/:project/cat/getPairs/:projectId")
  @validate
  getPairs<T>(
    @required projectId: string | number,
    languageId?: string | number,
  ): Promise<T[]> {
    const params = { projectId };
    const callback = function (list: object[]) {
      const id = _.toInteger(languageId);
      const array = transformPairs<object>(list);
      // 根据源语言过滤数据
      return _.filter(array, function (data: T) {
        if (id && id > 0) {
          return id === safeGet<number>(data as object, "source.id");
        }
        return true;
      });
    }
    return { params, callback } as any;
  }

  // 设置语言对
  @tryError(false)
  @$error("Edit failed, please contact administrator or try again later.")
  @post("/:project/cat/file/set-lpairs")
  @validate
  setPairs<D = object>(@required fileIds: Array<string | number>, @required languagePairs: D): Promise<boolean> {
    const data = { fileIds, langPairIds: languagePairs };
    return { data } as any;
  }

  //获取任务相关文件接口
  @tryError(new PageResult<object>())
  @post("/:task/file/list")
  @validate
  taskFileList<T>(
    @required taskId: number | string,
    @required fileType: FileType
  ): Promise<PageResult<T>> {
    const data = {
      taskId,
      type: fileType
    };
    return { data } as any;
  }

  // 上传task任务的文件
  @tryError(false)
  @$error("Added failed, please contact administrator or try again later.")
  @post("/:task/file/uploadFile")
  @validate
  uploadTaskFile<D>(
    @required file: D,
    @required taskId: string | number,
    @required fileType: FileType
  ): Promise<boolean> {
    const data = {
      ...file,
      taskId,
      type: getType(fileType)
    };
    return { data } as any;
  }

  //删除task任务相关文件接口
  @tryError(false)
  @$error("Delete failed, please contact administrator or try again later.")
  @post("/:task/file/deleteFile")
  @validate
  deleteTaskFile<D = string | number>(@required fileIds: D[]): Promise<boolean> {
    const data = { fileIds };
    return { data } as any;
  }

}