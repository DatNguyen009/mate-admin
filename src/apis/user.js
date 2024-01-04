import httpService from "services/httpService";

export const login = payload => {
  return httpService.post("/parse/login", payload);
};
