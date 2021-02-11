import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute : React.FC<RouteProps> = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } : any = useContext(AuthContext);
  if (!RouteComponent) return null;
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};


export default PrivateRoute;