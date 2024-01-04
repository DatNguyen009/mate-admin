import axios from "axios";
import toastr from "toastr";

const httpService = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

// Handle request
httpService.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("authUser");
    config.headers["X-Parse-Application-Id"] = "SCWASRTWK1Y9AVMP1KSY";
    if (!token) return config;
    config.headers["X-Parse-Session-Token"] = JSON.parse(token);
    if (
      !config.url.includes("parse/functions/dashboard-summary") &&
      !config.url.includes("parse/functions/create-purchase")
    ) {
      // config.headers["X-Parse-Master-Key"] = "LASDK106JKHR87SDFJSDHF0DFHASFDF";
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);
// Handle response
httpService.interceptors.response.use(
  function (response) {
    let res = response.data;
    // if (response.data.content) {
    //   res = response.data.content;
    // }
    return res;
  },

  function (error) {
    if (error.response && error.response.data) {
      if (error.response.data.code === 209) {
        localStorage.removeItem("authUser");
        toastr.error("Please login again!");
        // window.location.replace(
        //   `${process.env.REACT_APP_URL || "localhost:3000"}/login`
        // );
        // return;
      }

      // let { data } = error.response;
      // return data;
    }
    return Promise.reject(error);
  }
);

export default httpService;
