import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_UPLOADED } from "helpers/name_helper";
import { GET_FILES } from "helpers/url_helper";
import httpService from "services/httpService";

const DEFAULT_DOMAIN_NAME = "http://0.0.0.0:1337";

export const uploadFilesApi = async selectedFiles => {
  const requests = selectedFiles.reduce((promises, file) => {
    const validFileName = file.name
      .slice(0, file.name.lastIndexOf("."))
      .replace(/[^a-zA-Z0-9]/g, "");
    const headers = {
      headers: {
        "Content-Type": file.type,
      },
    };
    const promise = httpService
      .post(`${GET_FILES}/${validFileName}`, file, headers)
      .then(res => ({
        ...res,
        // originName: file.name,
        // type: file.type,
        // size: file.formattedSize,
        __type: "File",
      }));
    return promises.concat(promise);
  }, []);

  try {
    const response = await Promise.all(requests);
    const results = response.map(file => {
      const url = file.url.replace(
        DEFAULT_DOMAIN_NAME,
        `${process.env.REACT_APP_BASE_URL}`
      );
      return {
        ...file,
        url,
      };
    });

    return results;
  } catch (err) {
    toastrError();
    return [];
  }
};

export const deleteFileApi = selectedFile => {
  const headers = {
    headers: {
      "X-Parse-Master-Key": process.env.REACT_APP_MASTER_KEY,
    },
  };

  try {
    httpService.delete(`${GET_FILES}/${selectedFile.name}`, headers);
  } catch (error) {}
  toastrCRUDSuccess("File", TEXT_DELETE);
};
