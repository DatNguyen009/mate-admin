import PropTypes from "prop-types";
import React, { Component } from "react";

//Simple bar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { fetchMenu } from "redux-toolkit/slices/SysCfgSlice/MenuSlice";
import { Icons } from "components/Icon";
import _, { isEmpty } from "lodash";
import httpService from "services/httpService";
import { getUserRole } from "helpers/erp_helper";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.refDiv = React.createRef();
    this.handleClickItem = this.handleClickItem.bind(this);
    this.state = { selectedRoute: "/", menu: [] };
  }
  handleClickItem(route) {
    this.setState({ selectedRoute: route });
  }
  async componentDidMount() {
    const menuRes = await httpService.get(
      '/parse/classes/Menu?order=order&include=["rootPath"]&where={"appName": "web_admin"}'
    );
    // const userRoles = await getUserRole();
    // const schemas = (
    //   await httpService.get("/parse/schemas", {
    //     headers: {
    //       "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFDF",
    //     },
    //   })
    // ).results;

    const roleCheckedMenu = menuRes.results.map(menu => {
      if (menu.isRootPath) {
        // const parentRoleList = Object.keys(menu?.ACL || {})
        //   .filter(roleName => roleName.includes("role:"))
        //   .map(roleName => roleName.split("role:")[1]);

        // const active =
        //   parentRoleList.filter(roleName => userRoles.includes(roleName))
        //     .length > 0;
        return { ...menu };
      }

      // if (!menu.isRootPath && menu.model) {
      // const schemaSelected = schemas.find(
      //   schema => schema.className === menu.model
      // );
      // const roleList =
      //   schemaSelected?.classLevelPermissions &&
      //   Object.keys(schemaSelected.classLevelPermissions?.find)
      //     .filter(roleName => roleName.includes("role:"))
      //     .map(roleName => {
      //       return roleName.split("role:")[1];
      //     });
      // const isVerified =
      //   roleList?.filter(roleName => userRoles.includes(roleName)).length > 0;
      // if (roleList?.length > 0 && !isVerified)
      //   return { ...menu, active: false };
      // }

      console.log("menu", menu);

      return menu;
    });

    const menu = roleCheckedMenu.filter(m => m.isRootPath);
    const menuWithSub = menu.map(m => {
      const subMenu = _.orderBy(
        roleCheckedMenu.filter(
          item =>
            !item.isRootPath &&
            item.active &&
            item?.rootPath?.objectId === m?.objectId
        ),
        "order",
        "asc"
      );
      return { ...m, menu: subMenu };
    });
    this.setState({ ...this.state, menu: menuWithSub });
    this.menu = new MetisMenu("#side-menu", { toggle: false });
    const location = this.props.location;
    const currentPath = location.pathname + location.search + location.hash;
    const itemEl = document.getElementById(currentPath);
    if (itemEl?.parentElement?.tagName == "UL")
      this.menu.toggle(itemEl.parentElement);
    this.setState({ selectedRoute: currentPath });
  }

  mapMenuToLi = listItem => {
    return listItem?.map((item, index) => {
      if (item.active) {
        return (
          <li key={index}>
            <Link
              to={item.path}
              className={
                isEmpty(item.menu)
                  ? this.state.selectedRoute == item.path
                    ? "active"
                    : ""
                  : " has-arrow "
              }
              aria-expanded="false"
              onClick={() =>
                isEmpty(item.menu) && this.handleClickItem(item.path)
              }
            >
              {Icons[item.icon]}
              <span style={{ paddingLeft: 16 }}>{item.name}</span>
            </Link>
            {!isEmpty(item.menu) && (
              <ul
                className="sub-menu"
                aria-expanded={index === 0 ? "true" : "false"}
                id={"sidebar-menu-item" + index}
              >
                {item.menu?.map((subItem, index) => {
                  return (
                    <li key={index} id={subItem.path}>
                      <Link
                        to={subItem.path}
                        onClick={() => this.handleClickItem(subItem.path)}
                        style={{ paddingLeft: 80 }}
                        className={
                          this.state.selectedRoute == subItem.path
                            ? "active"
                            : ""
                        }
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      }
    });
  };

  render() {
    const { menu } = this.state;
    return (
      <React.Fragment>
        <SimpleBar className="h-100 mt-3 " ref={this.refDiv}>
          <div id="sidebar-menu" className="mm-active">
            <ul className="metismenu list-unstyled mm-show" id="side-menu">
              {this.mapMenuToLi(menu)}
            </ul>
          </div>
        </SimpleBar>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { menu } = state.Menu;
  return { menu };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMenu: () => dispatch(fetchMenu()),
  };
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  type: PropTypes.string,
  fetchMenu: PropTypes.func,
  menu: PropTypes.array,
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withRouter(withTranslation()(SidebarContent)));
