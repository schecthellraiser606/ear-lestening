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
import { ListeningMartch} from "../components/pages/ListeningMatch";

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
    <PrivateRoute exact path="/user_setting"><UserSetting /></PrivateRoute>
    <Route exact path="/search_result"><ListeningMartch/></Route>

    <Route path="*"><Page404/></Route>
  </Switch>
  </Footerless>
  );
});