export class FileItem {
  createdTime: string = ""; // 文件上传/修改时间
  parentId: number = 0;
  fileId: number | undefined = void 0; // 文件ID 等于 0 时为文件夹
  id: number | undefined = void 0; 
  name: string = ""; // 文件名称
  size: number = 0; // 文件大小
  ossObject: string = ""; // 文件 url
}