export enum DownloadType {
  oss = 0, // 阿里云模式
  net = 1, // 旧系统 net 模式
  file = 3 // 直接根据文件链接进行下载
}

export enum Env {
  dev = "dev",
  test = "test",
  ectranslate = "ectranslate",
  prod = "prod"
};


export const NetApi = {
  [Env.dev]: "http://filebus.eciol-dev.com/signalr",
  [Env.test]: "http://fssyweb.eciol-test.com/signalr",
  [Env.ectranslate]: "http://fscommonweb.ectranslate.com/signalr",
  [Env.prod]: "https://fscnweb.eciol.com/signalr"
};

export const DomainApi = {
  [Env.dev]: "http://erpapi.eciol-dev.com/",
  [Env.test]: "http://erpapi.eciol-test.com/",
  [Env.ectranslate]: "http://nerpapi.ectranslate.com:9999/",
  [Env.prod]: "https://erpapi.eciol.com/"
};
