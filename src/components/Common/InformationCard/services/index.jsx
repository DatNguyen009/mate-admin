import httpService from "services/httpService";
import { REMOVE_SCHEMA } from "../constants";

export const APISchema = async () => {
  const data = await httpService.get("/parse/schemas", {
    headers: {
      "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFDF",
    },
  });
  const result = data.results;
  const filter = result.filter(
    item => !REMOVE_SCHEMA.some(ob => ob === item.className)
  );
  return filter;
};
