import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { setDefaultDataSideBar } from "../../redux-toolkit/slices/Layout/LayoutSlice";
import { Link } from "react-router-dom";
import logo from "assets/images/img_app.png";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

const Sidebar = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDefaultDataSideBar());
  }, []);

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box" style={{ marginTop: 22 }}>
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} alt="" />
              <span
                className="tittleSidebar"
                style={{ paddingLeft: 16, color: "#FFFFFF" }}
              >
                LIFE STYLE
              </span>
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" width={"50px"} />
              <span
                className="tittleSidebar"
                style={{ paddingLeft: 16, color: "#FFFFFF" }}
              >
                LIFE STYLE
              </span>
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logo} alt="" width={"50px"} />
              <span
                className="tittleSidebar"
                style={{ paddingLeft: 16, color: "#FFFFFF" }}
              >
                LIFE STYLE
              </span>
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" width={"50px"} />
              <span
                className="tittleSidebar"
                style={{ paddingLeft: 16, color: "#FFFFFF" }}
              >
                LIFE STYLE
              </span>
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100 pt-4">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

export default connect(
  mapStateToProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
