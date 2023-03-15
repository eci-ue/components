/**
 * @file 项目相关接口
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { PageResult } from "@ue/utils";
import { $error, $success } from "@ue/message";
import { transformPairs } from "../utils";
import safeGet from "@fengqiaogang/safe-get";
import { FileType } from "../components/drive/props";
import { API, post, get, tryError, validate, required } from "@js-lion/api";


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
  /**
   * 获取task语言对
   * @param taskId 任务ID
   * @languageId 源语言ID
   */
  @tryError([])
  @post("/:task/file/getTaskLanguagePair")
  @validate
  getTaskPairs<T>(
    @required taskId: string | number,
    languageId?: string | number,
  ): Promise<T[]> {
    const data = { taskId };
    const callback = function (list: object[]) {
      const id = _.toInteger(languageId);
      const data = _.map(list, function (data: any) {
        return {
          sourceCountryId: data.slangCountryId,
          sourceLanguageId: data.slangId,
          sourceLanguageName: data.slang,
          targetCountryId: data.tlangCountryId,
          targetLanguageId: data.tlangId,
          targetLanguageName: data.tlang,
        }
      });
      const array = transformPairs<object>(data);
      // 根据源语言过滤数据
      return _.filter(array, function (data: T) {
        if (id && id > 0) {
          return id === safeGet<number>(data as object, "source.id");
        }
        return true;
      });
    }
    return { data, callback } as any;
  }
  // 设置task语言对
  @tryError(false)
  @$error("Edit failed, please contact administrator or try again later.")
  @post("/:task/file/setFileLanguagePair")
  @validate
  setTaskPairs<D>(@required fileIds: Array<string | number>, @required languagePairs: D): Promise<boolean> {
    let data:any = []
    _.each(fileIds,val=>{
      _.each(languagePairs || [],(item:any)=>{
        data.push({
          fileId:val,
          slangId:item.sourceLanguageId,
          tlangId:item.targetLanguageId
        })
      })
    })
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
    const callback = function (list: T[]) {
      return _.map(list, function (data: object) {
        const value = _.get<object, string>(data, "languagePair");
        const pairs = _.map(value, function (data: any) {
          return {
            sourceCountryId: data.slangCountryId,
            sourceLanguageId: data.slangId,
            sourceLanguageName: data.slang,
            targetCountryId: data.tlangCountryId,
            targetLanguageId: data.tlangId,
            targetLanguageName: data.tlang,
          }
        });
        const languagePairs = transformPairs<object>(pairs);
        return { ...data, languagePairs } as T;
      });
    };
    return { data, callback } as any;
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

  /**
   * 将网盘文件上传到task项目中
   * @param fileIds 
   * @param taskId  任务id 
   * @param fileType 
   * @returns 
   */
  @tryError(false)
  @$error("Added failed, please contact administrator or try again later.")
  @post("/:task/file/uploadOssFolder")
  @validate
  uploadTaskDrive(
    @required fileIds: number | number[],
    @required taskId: string | number,
    @required type: FileType
  ): Promise<boolean> {
    const data = { fileIds, taskId, type};
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

  /**
   * 文件导出
   * @param list 文件ID集合  
   * @param type 导出类型 1: Current xliff files 2: Current target files
   * @param subType 服务小类
   * @param operator 是否为 PM 权限（1: 是、2: 否）
   * @param userType 1: 内部资源, 2: 外部资源, 当 operator 为 0/false 时必填
   * @returns 
   */
  @tryError(false)
  @$error()
  @$success(`Export process start successfully, check result in "Export Record"`)
  @post("/:task/bilingual/export")
  @validate
  fileExport(
    @required list: Array<string | number>,  
    type: string | number = 1,
    subType?: string,
    operator: number | boolean = 1,
    userType?: number
  ): Promise<boolean> {
    const fileIds = _.compact(_.concat(list));
    const data = { 
      fileIds, 
      type,
      subType,
      operatorType: operator ? 1 : 0,
      userType: userType
    };
    return { data } as any;
  }

  /**
   * 获取 Momeq 下载任务列表
   * @param projectId  项目ID
   * @param pageNum    页码
   * @param pageSize   每页条数
   */
  @tryError(new PageResult())
  @post("/:task/downfile/list", { withCredentials: true })
  @validate
  getExportMomoqFileList<T>(
    @required projectId: string | number,
    pageNum: number = 1,
    pageSize: number = 20,
  ): Promise<PageResult<T>> {
    const data = { projectId, pageNum, pageSize };
    return { data } as any;
  }

  /**
   * 获取 TransDoc 下载任务列表 （PM）
   * @param projectId 项目ID
   * @param languageId 语言ID
   */
  @tryError(new PageResult())
  @get("/:cat/cat/translation/export/task/list/pm", { withCredentials: true })
  @validate
  getExportTransDocPmFileList<T>(
    @required projectId: string | number, 
    @required languageId: string | number,
  ): Promise<PageResult<T>> {
    const params = { projectId, sourceLang: languageId };
    const callback = function(list: T[]) {
      return list.map((item: T) => {
        const key = safeGet<string>(item as object, "zipFileId");
        return Object.assign({ key }, item);
      });
    }
    return { params, callback } as any;
  }
  /**
   * 获取 TransDoc 下载任务列表 （议员）
   * @param projectId 项目ID
   * @param languageId 语言ID
   * @param partner    是否是外部议员
   */
  @tryError(new PageResult())
  @get("/:cat/cat/translation/export/task/list/other", { withCredentials: true })
  @validate
  getExportTransDocFileList<T>(
    @required projectId: string | number, 
    @required languageId: string | number,
    partner: boolean = false,
  ): Promise<PageResult<T>> {
    const params = { projectId, sourceLang: languageId, userType: partner ? 2 : 1 };
    const callback = function(data: object) {
      const list = safeGet<T[]>(data, "taskInfoList") || [];
      const cookie = safeGet<object[]>(data, "taskPMCookieList") || [];
      return list.map((item: T) => {
        const key = safeGet<string>(item as object, "zipFileId");
        return Object.assign({ cookie, key }, item);
      });
    }
    return { params, callback } as any;
  }


  /**
   * CAT 基础信息
   * @param id 项目ID
   * @param language 语言ID
   * @returns CatConfig
   */
  @tryError(void 0)
  @get("/:project/cat/getConfig/:projectId")
  @validate
  catConfig<T>(
    @required id: string | number,
    @required language: string | number
  ): Promise<T> {
    const params = { projectId: id, sourceLanguageId: language };
    const callback = function(res: T) {
      if (_.isBoolean(res) || _.isNil(res)) {
        return void 0;
      }
      return res;
    }
    return { params, callback } as any;
  }


  /**
   * 计算memoq penalty point对应级别接口
   * @param point MemoQ penalty point
   * @param fileId 双语文件ID
   */
  @tryError(0)
  @$error()
  @post("/:task/detail/culMemoqPoint")
  @validate
  culMemoqPoint(@required fileId: number | string, @required point: number): Promise<number> {
    const data = { point, fileId };
    return { data } as any;
  }

  /**
   * 保存LQR文件及评价
   * @param data Lqr 数据
   * @param partner 是否为外部议员提交
   */
  @tryError(false)
  @$error()
  @$success("Saved Successfully")
  @validate
  saveLqr<D>(@required data: D, partner: boolean = false): Promise<Boolean> {
    const api = new API();
    if (partner) {
      return api.post("/:task/partner/lqr/submit", data);
    }
    return api.post("/:task/lqr/saveLqr", data);
  }

  /**
   * 获取 Lqr 列表
   * @param taskId 任务ID
   * @returns 
   */
  @tryError(new PageResult())
  @post("/:task/lqr/list")
  lqrList(@required taskId: string | number): Promise<PageResult> {
    const data = { taskId };
    return { data } as any;
  }
}