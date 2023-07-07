import { LanguageOneToMoreType } from "../source";
export class MemoqItemData {
  catProjectId!: number;
  catProjectName: string = "";
  createUserName: string = "";
  createTime: string = "";
  sourceLangName: string = "";
  sourceLang!: number;
  sourceCountryId!: number;
  targetLangInfoList: TargetLang[] = [];
  clientName: string = "";
  toolProjectId: string = "";
  languagePair!:LanguageOneToMoreType //显示语言对的字段
}
interface TargetLang {
  targetLang: number,
  targetLangCountry: number,
  targetLangName: string,
}
export class ToolProjectData {
  catProjectName: string = "";
  clientName: string = "";
  createBy: string = "";
  size?: number;
  sourceLangName: string = "";
  sourceLang!: number;
  sourceLangCountry!: number;
  startTime: string = "";
  toolProjectId: string = "";
  targetLangList: TargetLang[] = [];
  languagePair!:LanguageOneToMoreType //显示语言对的字段
}

export interface ApiType {
  listApi?: () => Promise<MemoqItemData[]>;//列表请求
  deleteApi?: (data: MemoqItemData) => Promise<boolean>;//删除请求
}

export const headMemoq = [
  { title: `Project Name`, dataIndex: "catProjectName" },
  { title: `Size`, dataIndex: 'size', width: 120 },
  { title: 'Client Name', dataIndex: 'clientName' },
  { title: 'Language pairs', dataIndex: 'language' },
  { title: 'Created by', dataIndex: 'createBy' },
  { title: 'Start Date', dataIndex: 'startTime', width: 120 }
]