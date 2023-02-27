/**
 * @file 公共组件
 * @author svon.me@gmail.com
 */


import lib from "./lib/index";
export * from "./components/operate";
export { default as Pic } from "./components/icon/pic.vue";
export { default as Enum } from "./components/enum/index.vue";
export { default as Alter } from "./components/alter/index.vue";


export { IconExpand } from "./components/icon/expand";
export { default as Link } from "./components/link";
export { default as Time } from "./components/time";

export { default as Icon } from "./components/icon";

export { default as DriveFile } from "./utils/drive";
export { default as Drive, FileType, FileOperate } from "./components/drive";

export * from "./components/project"
export { ExportDownload, ExportRecord, ExportFile, WorkMode, ExportButton } from "./components/export";

export { default as FileIcon } from "./components/icon/file.vue";
export { default as Upload, UploadSkin } from "./components/upload";
export * as UploadUtil from "./utils/upload";

export { default as FileCheckbox } from "./components/file/checkbox";
export { LanguagePairs, LanguageGroup, LanguageData, LanguagePairsData } from "./components/language";

export { default as FormFile } from "./components/form/file.vue";
export { default as FormLanguagePairs } from "./components/form/language/pairs.vue";

export default lib;