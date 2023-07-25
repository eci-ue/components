/**
 * @file 公共组件
 * @author svon.me@gmail.com
 */

import lib from "./lib/index";
import Alert from "./components/alert/index.vue";

export { Alert, Alert as Alter };

export * from "./components/operate";

export { MemoqExpress, ImportMemoqExpress, MemoqCard, MemoqItemData, ToolProjectData } from "./components/memoq";
export { LanguageOneToMoreType, LanguageOneToMore } from "./components/source";

export { default as Header } from "./components/header/index.vue";
export type { MenuData as HeaderMenuData } from "./components/header/type";

export { default as Enum } from "./components/enum/index.vue";

export { default as Link } from "./components/link";
export { default as Time } from "./components/time";
export { default as TimeDelivery } from "./components/time/delivery.vue";

export { default as DriveFile } from "./utils/drive";
export { default as Drive, FileType, FileOperate } from "./components/drive";

export * from "./components/project";
export * from "./components/ui/index";
export { DownloadType } from "./components/download/type";
export { default as Download } from "./components/download/index.vue";
export { ExportDownload, ExportRecord, ExportFile, WorkMode, ExportButton } from "./components/export";


// export { default as Upload, UploadSkin } from "./components/upload";
// export * as UploadUtil from "./utils/upload";

export { default as FileCheckbox } from "./components/file/checkbox";
export { LanguagePairs, LanguageGroup, LanguageData, LanguagePairsData } from "./components/language";

export { default as Interrputted } from "./components/interrputted/index.vue";

export * from "./components/form";

export default lib;
