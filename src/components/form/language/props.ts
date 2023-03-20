import type { FormItemMeta } from "@ue/form";
import type { LanguagePairsData, LanguageData } from "../../language/props";

export interface Meta<Language = LanguageData> extends FormItemMeta{
  list: Array<LanguagePairsData<Language>>;
  border: boolean;
}