/**
 * @file 公共组件
 * @author svon.me@gmail.com
 */


import lib from "./lib/index";
import Alert from "./components/alert/index.vue";

export { Alert, Alert as Alter };

export * from "./components/operate";
export { default as Pic } from "./components/icon/pic.vue";
export { default as Enum } from "./components/enum/index.vue";

export { IconExpand } from "./components/icon/expand";
export { default as Link } from "./components/link";
export { default as Time } from "./components/time";
export { default as TimeDelivery } from "./components/time/delivery.vue";

export { default as Icon } from "./components/icon";

export { default as DriveFile } from "./utils/drive";
export { default as Drive, FileType, FileOperate } from "./components/drive";

export * from "./components/project"
export { DownloadType } from "./components/download/type";
export { default as Download } from "./components/download/index.vue";
export { ExportDownload, ExportRecord, ExportFile, WorkMode, ExportButton } from "./components/export";

export { default as FileIcon } from "./components/icon/file.vue";
export { default as Upload, UploadSkin } from "./components/upload";
export * as UploadUtil from "./utils/upload";

export { default as FileCheckbox } from "./components/file/checkbox";
export { LanguagePairs, LanguageGroup, LanguageData, LanguagePairsData } from "./components/language";

export * from "./components/form";

export default lib;
