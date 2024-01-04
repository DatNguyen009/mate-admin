import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Route,
  Redirect,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import VerticalLayout from "components/VerticalLayout/";
import httpService from "services/httpService";
import { GET_ALL_MENU } from "helpers/url_helper";
import Pages404 from "pages/page-themes/Utility/pages-404";

const LoadingScreen = () => {
  return (
    <div className="page-content">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: 550 }}
      >
        <div className="spinner-border text-info">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

const AuthenticatedRoutes = ({ routes }) => {
  const isLogined = Boolean(localStorage.getItem("authUser"));
  if (!isLogined) return <Redirect to="/login" />;

  const [isVerified, setIsVerified] = useState(false);
  const [routesRole, setRoutesRole] = useState([]);

  const location = useLocation();
  const pathname = location.pathname;
  const hashName = location.hash;
  const history = useHistory();
  const checkRole = async () => {
    setIsVerified(false);
    let rootRoute = "/" + pathname.split("/")[1];
    if (pathname === "/") rootRoute = "/dashboard";

    const route = (
      await httpService.get(
        `/parse/classes/Menu?where={"path":"${rootRoute}"}&include=["rootPath"]`
      )
    ).results[0];

    if (route?.model && !route.isRootPath && !route?.rootPath) {
      history.replace("/pages-404");
      return;
    }

    if (!route) {
      setIsVerified(true);
      return;
    }

    if (route?.isRootPath) {
      setIsVerified(true);
      return;
    }

    const UOI = (await httpService.get("/parse/users/me")).objectId;

    if (!route.model) {
      const rootRoleList = route.rootPath?.ACL
        ? Object.keys(route.rootPath.ACL)
            .filter(roleName => roleName.includes("role:"))
            .map(roleName => {
              return roleName.split("role:")[1];
            })
        : [];
      if (!rootRoleList.length) {
        setIsVerified(true);
        return;
      }
      const query = JSON.stringify(
        rootRoleList.map(roleName => ({
          name: roleName,
          users: { __type: "Pointer", className: "_User", objectId: UOI },
        }))
      );
      const checkRole = (
        await httpService.get(`/parse/roles?where={"$or": ${query}}`)
      ).results;

      if (!checkRole.length) {
        history.replace("/pages-404");
      } else {
        setIsVerified(true);
      }
      return;
    }

    const classPermission = (
      await httpService.get(`/parse/schemas/${route.model}`, {
        headers: {
          "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFDF",
        },
      })
    ).classLevelPermissions;

    const roleList = Object.keys(classPermission.find)
      .filter(roleName => roleName.includes("role:"))
      .map(roleName => {
        return roleName.split("role:")[1];
      });
    const rootRoleList = route.rootPath?.ACL
      ? Object.keys(route.rootPath.ACL)
          .filter(roleName => roleName.includes("role:"))
          .map(roleName => {
            return roleName.split("role:")[1];
          })
      : [];

    if (!roleList.length && !rootRoleList.length) {
      setIsVerified(true);
      return;
    }

    const query = JSON.stringify(
      roleList.length
        ? roleList.map(roleName => ({
            name: roleName,
            users: { __type: "Pointer", className: "_User", objectId: UOI },
          }))
        : rootRoleList.map(roleName => ({
            name: roleName,
            users: { __type: "Pointer", className: "_User", objectId: UOI },
          }))
    );

    const checkRole = (
      await httpService.get(`/parse/roles?where={"$or": ${query}}`)
    ).results;

    if (!checkRole.length) {
      history.replace("/pages-404");
    } else {
      setIsVerified(true);
    }
  };

  useEffect(async () => {
    const { results } = await httpService.get(GET_ALL_MENU);
    setRoutesRole(results);
  }, []);

  return (
    <VerticalLayout>
      <Switch>
        {routes.map((route, idx) => {
          const Component = route.component;
          const newPathName = pathname.split("/");
          const isCorrectRoute = routesRole.find(r => {
            if (pathname !== r.path && !hashName && newPathName.length === 2) {
              return r.path === pathname;
            }
            return r.path && r.path.includes(`${newPathName?.[1]}${hashName}`);
          });

          return `${pathname}${hashName}`.includes(
            !isCorrectRoute?.path.includes("#") && newPathName.length === 2
              ? isCorrectRoute?.path
              : hashName
          ) || pathname === "/" ? (
            <Route
              path={route.path}
              key={idx}
              exact
              render={props => {
                // if (!isVerified) return <LoadingScreen />;
                return <Component {...props} />;
              }}
            />
          ) : (
            <Pages404 />
          );
        })}
      </Switch>
    </VerticalLayout>
  );
};

AuthenticatedRoutes.propTypes = {
  routes: PropTypes.array,
};

export default AuthenticatedRoutes;
