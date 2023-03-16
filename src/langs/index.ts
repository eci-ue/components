import { LanguageType } from "@ue/i18n";
import * as CN from "./cn/index";
import * as EN from "./en/index";

import type { Language as UeI18n } from "@ue/i18n";

export type Language = typeof EN & UeI18n;

export const Langs = {
  [LanguageType.cn]: CN,
  [LanguageType.en]: EN,
};