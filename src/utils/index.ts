import * as _ from "lodash-es";

export const transformPairs = function<T = object, D = object>(list: D[]): T[] {
  return _.map(list, function(data: D) {
    const languagePairs = {
      source: {
        pic: _.get<D, string>(data, "sourceCountryId"),
        id: _.get<D, string>(data, "sourceLanguageId"),
        name: _.get<D, string>(data, "sourceLanguageName"),
      },
      target: {
        pic: _.get<D, string>(data, "targetCountryId"),
        id: _.get<D, string>(data, "targetLanguageId"),
        name: _.get<D, string>(data, "targetLanguageName"),
      },
    };
    return languagePairs as T;
  });
}

export const some = function<T>(list: T[], value: any): T | undefined {
  for(const item of list) {
    let status = false;
    if (_.isArray(item)) {
      status = _.includes(item, value);
    } else if (_.isObject(item)){
      for(const key of _.keys(item)) {
        if (_.get(item, key) === value) {
          status = true;
          break;
        }
      }
    } else {
      status = item === value;
    }
    if (status) {
      return item;
    }
  }
}