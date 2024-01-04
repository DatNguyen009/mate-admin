import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { authProtectedRoutes, publicRoutes } from "routes";
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import "./assets/scss/theme.scss";
import RootModal from "components/Modal";
import { GlobalStyle } from "components/Common/createGlobalStyle";
import AuthenticatedRoutes from "routes/AuthenticatedRoutes";
import UnauthenticatedRoutes from "routes/UnauthenticatedRoutes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getLayout = this.getLayout.bind(this);
  }

  getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (this.props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  render() {
    const Layout = this.getLayout();
    return (
      <Router>
        <GlobalStyle />
        <Switch>
          <Route exact path={authProtectedRoutes.map(route => route.path)}>
            <AuthenticatedRoutes routes={authProtectedRoutes} />
          </Route>

          <Route exact path={publicRoutes.map(route => route.path)}>
            <UnauthenticatedRoutes routes={publicRoutes} />
          </Route>
        </Switch>
        <RootModal />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: state.LayoutToolkit,
  };
};

App.propTypes = {
  layout: PropTypes.object,
};
export default connect(mapStateToProps, null)(App);
