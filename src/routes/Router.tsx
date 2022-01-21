import {memo, useEffect, VFC} from "react";
import { Switch, Route } from "react-router-dom";
import {Footerless} from "../components/templetes/Footerless"
import {Top} from "../components/pages/Top" 
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { UserCreate } from "../components/pages/user/userCreate";
import PrivateRoute from "./PrivateRoute";
import {UserSetting} from "../components/pages/user/userSetting"
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../store/userState";
import { auth } from "../API/firebase/firebase";
import PublicRoute from "./PublicRoute";
import { Listening_martch } from "../components/pages/Listening_match";
import { One_Listening } from "../components/pages/One_Listening";

export const Router: VFC = memo(()=>{
  const setUser = useSetRecoilState(userState);
  const resetStatus = useResetRecoilState(userState);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((authuser) => {
      if(authuser){
        setUser(authuser);
      } else{
        resetStatus();
      } 
    });
    return () => unsubscribed();
  }, [setUser, resetStatus]);

  return(
  <Footerless>
  <Switch>
    <Route exact path="/"><Top /></Route>
    <PublicRoute path="/login"><Login /></PublicRoute>
    <Route path="/account_create"><UserCreate /></Route>
    <PrivateRoute exact path="/user/setting"><UserSetting /></PrivateRoute>
    <Route exact path="/search_result"><Listening_martch/></Route>
    <Route path="/test"><One_Listening /></Route>

    <Route path="*"><Page404/></Route>
  </Switch>
  </Footerless>
  );
});