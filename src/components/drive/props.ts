// 文件类型
export enum FileType {
  ref = 0, // 引用文件value：0
  source, // 源文件value：1
  deliver, // 任务交付文件value：2
  attachment, // attachment的上传value：3
  tb = "tb", // 术语文件
  tm = "tm", // 翻译文件
}

export interface Props {
  id: string | number;       // 项目ID或者任务ID
  language: string | number; // 语言ID
  type: FileType;            // 文件类型
  task?: boolean;            // 是否为 task 任务
  disabled?: boolean;         // 是否禁用
  fileOperate?: FileOperate[];
  accept?: string | ((value: File) => boolean);  // 文件过滤条件
  onChange?: (fileCount: number) => void
}


export class FileItem<Language = object> {
  fileExt: string = ""; // 文件类型（文件后缀）
  createdTime?: string;  // 创建时间
  fileId?: string | number; // 如果是源文件，则为网盘文件ID
  fileName: string = ""; // 文件名称
  filePath: string = ""; // 文件路径
  fileSize: number = 0;     // 文件大小
  languagePairs?: Language; // 语言对
  key?: string;         // 文件唯一值（文件上传时使用）
  progress: number = 0; // 文件上传进度
  [key: string]: any;
}

// 文件操作按钮
export enum FileOperate {
  upload = "upload", // 上传
  large = "large files entry", // large files entry
  delete = "delete", // delete
  language = "Language pairs", // Language pairs
  download = "download", //  download
  downTarget = "download-target", // download -target
}