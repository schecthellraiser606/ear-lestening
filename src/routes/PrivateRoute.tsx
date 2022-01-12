import {memo, VFC} from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import _ from 'lodash'
import { useAuthHook } from "../hooks/user/useAuthHook";


const PrivateRoute: VFC<RouteProps> = memo((props)=>{
  const rest = _.omit(props, ['component']) 
  
  const {useAuth} = useAuthHook();
  const signInUser = useAuth();

  return(
    <Route
    {...rest}
    render={innerProps =>
      signInUser ? (
        <Route {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: innerProps.location }
          }}
        />
      )
    }
  />
  );
});

export default PrivateRoute