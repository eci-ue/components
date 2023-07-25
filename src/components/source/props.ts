
export class LanguageData {
  id?: string | number;
  pic?: string | number;
  name?: string;
}

export class LanguageOneToMoreType<Data = LanguageData> {
  source?: Data;
  target: Data[];
  constructor(target: Data[], source?: Data) {
    this.source = source;
    this.target = target;
  }
}