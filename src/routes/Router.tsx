import {memo, VFC} from "react";
import { Switch, Route } from "react-router-dom";
import {Footerless} from "../components/templetes/Footerless"
import {Top} from "../components/pages/Top" 
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { UserCreate } from "../components/pages/user/userCreate";
import PrivateRoute from "./PrivateRoute";
import {UserSetting} from "../components/pages/user/userSetting"
import { useAuthHook } from "../hooks/user/useAuthHook";

export const Router: VFC = memo(()=>{
  return(
  <Footerless>
  <Switch>
    <Route exact path="/"><Top /></Route>
    <Route path="/login"><Login /></Route>
    <Route path="/account_create"><UserCreate /></Route>
    <PrivateRoute path="/user/setting"><UserSetting /></PrivateRoute>


    <Route path="*"><Page404/></Route>
  </Switch>
  </Footerless>
  );
});