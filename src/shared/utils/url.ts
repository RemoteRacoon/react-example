import { omit } from "lodash";
import QueryString, { default as qs } from "qs";

export const queryStringToObject = (str, options?: object) => {
  return qs.parse(str, options);
}

export const objectToQueryString = (obj, options?: QueryString.IStringifyOptions) => {
  return qs.stringify(obj, { arrayFormat: 'brackets', ...options });
}

export const omitFromQueryString = (str, keys = []) => {
  return objectToQueryString(omit(queryStringToObject(str), keys));
}

export const addToQueryString = (str, fields: Object, options?: QueryString.IStringifyOptions) => {
  return objectToQueryString({
    ...queryStringToObject(str),
    ...fields,
  }, options)
}