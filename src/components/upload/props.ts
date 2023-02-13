
export enum UploadSkin {
  button = "button",
  default = "default",
  input = "input"
}

export declare interface UploadFile {
  key: string;
  url: string; // 文件 url 
  name: string; // 文件名称
  size: number; // 文件大小（字节单位）
  file?: File; // 文件对象
}

export declare interface Signature {
  accessId: string;
  dir: string;
  expire: string;
  host: string;
  policy: string;
  signature: string;
}

export declare interface SignatureSTS extends Signature{
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
  expiration: string;
  region: string;
  requestId: string;
  securityToken: string;
}