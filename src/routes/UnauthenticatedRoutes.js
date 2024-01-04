import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch } from "react-router-dom";
import NonAuthLayout from "components/NonAuthLayout";
const UnauthenticatedRoutes = ({ routes }) => {
  const isLogined = Boolean(localStorage.getItem("authUser"));
  const isRouteInAuthenticating = path =>
    ["/login", "/forgot-password"].includes(path);
  return (
    <NonAuthLayout>
      <Switch>
        {routes.map((route, idx) => {
          const Component = route.component;
          return (
            <Route path={route.path} key={idx} exact>
              {isLogined && isRouteInAuthenticating(route.path) ? (
                <Redirect to="/dashboard" />
              ) : (
                <Component />
              )}
            </Route>
          );
        })}
      </Switch>
    </NonAuthLayout>
  );
};

UnauthenticatedRoutes.propTypes = {
  routes: PropTypes.array,
};

export default UnauthenticatedRoutes;
