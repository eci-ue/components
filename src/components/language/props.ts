
export class LanguageData {
  id?: string | number;
  pic?: string | number;
  name?: string;
}

export class LanguagePairsData<Data = LanguageData> {
  source: Data;
  target?: Data;
  constructor(source: Data, target?: Data) {
    this.source = source;
    this.target = target;
  }
}