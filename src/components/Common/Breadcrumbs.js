import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const BreadCrumb = ({ children }) => {
  return (
    <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
      {React.Children.map(children, (child, index) => {
        return <li className="breadcrumb-item ">{child}</li>;
      })}
    </ol>
  );
};

export const BreadCrumbItem = ({ children, to }) => {
  return (
    <Link className="text-gray-400 text-capitalize" to={`${to}`}>
      {children}
    </Link>
  );
};

export const BreadCrumbs = props => {
  let location = useLocation();
  const pathName = location.pathname;
  const nameList = pathName.split("/");
  const { source } = props;
  let pathNameForItem = "";

  return (
    <>
      <div className="d-flex align-items-center">
        <div onClick={() => history.back()} style={{ cursor: "pointer" }}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <BreadCrumb>
          {nameList.map((item, index) => {
            if (item != "") {
              pathNameForItem += `/${item}`;
            }
            return item === "" ? (
              <React.Fragment key={index}>
                {source ? (
                  <BreadCrumbItem to={`/${source}`}>{source}</BreadCrumbItem>
                ) : (
                  <BreadCrumbItem to="">Home</BreadCrumbItem>
                )}
              </React.Fragment>
            ) : index + 1 === nameList.length ? (
              <span className="text-gray-400 text-capitalize" key={index}>
                {item}
              </span>
            ) : nameList > 3 && item === 3 ? (
              <BreadCrumbItem to={pathNameForItem} key={index}>
                {item.replaceAll("-", " ")}
              </BreadCrumbItem>
            ) : (
              <BreadCrumbItem to={pathNameForItem} key={index}>
                {item.replaceAll("-", " ")}
              </BreadCrumbItem>
            );
          })}
        </BreadCrumb>
      </div>
    </>
  );
};

BreadCrumb.propTypes = {
  children: PropTypes.node,
};
BreadCrumbs.propTypes = {
  source: PropTypes.node,
  title: PropTypes.string,
};

BreadCrumbItem.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  titleSize: PropTypes.bool,
};
