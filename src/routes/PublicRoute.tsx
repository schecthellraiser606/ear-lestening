import { memo, VFC} from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import _ from 'lodash'
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";


const PublicRoute: VFC<RouteProps> = memo((props)=>{
  const rest = _.omit(props, ['component'])

  const signInUser = useRecoilValue(userState);
  const isAuthenticated = signInUser !== null;

  return isAuthenticated ? <Redirect to="/" /> : <Route {...rest} />;
});

export default PublicRoute