import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import { connect } from "react-redux";

// routes config
import routes from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

class TheContent extends React.Component {
  state = {
    userRouteBasedPermissions: [],
  };
  async componentDidMount() {
    // const staffRequest = await Axios.get(`${BASE_EDPOINT}/api/admin/me`, {
    //   headers: { authorization: this.props.token },
    // });

    // let userRoutePermissions = this.props.user.role.Permissions.map(
    //   (permission) => permission.Name
    // );

    // let userRouteBasedPermissions = routes.reduce(
    //   (permissionBasedRoute, item) => {
    //     if (userRoutePermissions.includes(item.permission)) {
    //       delete item.permission;
    //       permissionBasedRoute.push(item);
    //     }
    //     return permissionBasedRoute;
    //   },
    //   []
    // );

    // this.setState({ userRouteBasedPermissions });
    this.setState({ userRouteBasedPermissions: routes });
  }
  render() {
    return (
      <main className="c-main">
        <CContainer fluid>
          <Suspense fallback={loading}>
            <Switch>
              {routes.map((route, idx) => {
                // if (route.component && route.permission == this.props.user.role)
                return (
                  route.component &&
                  (route.permission == this.props.user.role ||
                    route.permission === "All") && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <CFade>
                          <route.component {...props} />
                        </CFade>
                      )}
                    />
                  )
                );
              })}
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Suspense>
        </CContainer>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // token: state.user.token,
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(React.memo(TheContent));
