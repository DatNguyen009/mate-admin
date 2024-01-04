import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { options } from "helpers/erp_helper";
import {
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
  TEXT_UPLOADED,
  TEXT_CANCELED,
  TEXT_CONFIRMED,
} from "helpers/name_helper";

toastr.options = options;

export const toastrCRUDSuccess = (name, type) => {
  let actionName = "";
  if (type === TEXT_POST) {
    actionName = "added";
    return toastr.success(`New ${name} have been ${actionName} !`, "Success");
  }
  if (type === TEXT_PUT) {
    actionName = "updated";
  }
  if (type === TEXT_DELETE) {
    actionName = "deleted";
  }
  if (type === TEXT_UPLOADED) {
    actionName = "uploaded";
  }
  if (type === TEXT_CANCELED) {
    actionName = "canceled";
  }
  if (type === TEXT_CONFIRMED) {
    actionName = "confirmed";
  }
  return toastr.success(`${name} have been ${actionName} !`, "Success");
};

export const toastrError = () => {
  return toastr.error(
    "Error! Error! An error occurred. Please try again later.",
    "Error"
  );
};

export const toastrErrorAlert = name => {
  return toastr.error(name, "Error");
};

export const toastrSuccessAlert = name => {
  return toastr.success(name, "Success");
};
