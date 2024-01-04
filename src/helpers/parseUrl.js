import { setDefaultLocale } from "react-datepicker";

export const createUrlParams = paramObject => {
  return Object.keys(paramObject)
    .map(key => `${key}=${paramObject[key]}`)
    .join("&");
};
