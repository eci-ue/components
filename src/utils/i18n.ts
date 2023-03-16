/**
 * @file 语言包
 */

import I18n from "@ue/i18n";
import { Langs } from "../langs/index";
import type { Language } from "../langs/index";

const i18n = I18n<Language>();
i18n.append(Langs);

export default i18n;



