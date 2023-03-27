export enum DownloadType {
  oss = 0, // 阿里云模式
  net = 1, // 旧系统 net 模式
  file = 3 // 直接根据文件链接进行下载
}

export enum Env {
  dev = "dev",
  test = "test",
  ecinnovations = "ecinnovations",
  ectranslate = "ectranslate",
  prod = "prod"
};

export const Domain = {
  [Env.dev]: ".eciol-dev.com",
  [Env.test]: ".eciol-test.com",
  [Env.ecinnovations]: ".ecinnovations.com.cn",
  [Env.ectranslate]: ".ectranslate.com",
  [Env.prod]: ".eciol.com"
};

export const NetApi = {
  [Env.dev]: "//filebus.eciol-dev.com/signalr",
  [Env.test]: "//filebus.eciol-test.com/signalr",
  [Env.ecinnovations]: "//filebus.ecinnovations.com.cn/signalr",
  [Env.ectranslate]: "//filebus.ectranslate.com/signalr",
  [Env.prod]: "//filebus.eciol.com/signalr"
};

export const DomainApi = {
  [Env.dev]: "//erpapi.eciol-dev.com/",
  [Env.test]: "//erpapi.eciol-test.com/",
  [Env.ecinnovations]: "//erpapi.ecinnovations.com.cn/",
  [Env.ectranslate]: "//erpapi.ectranslate.com/",
  [Env.prod]: "//erpapi.eciol.com/"
};
