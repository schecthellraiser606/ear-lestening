import {memo, VFC} from "react";
import { Switch, Route } from "react-router-dom";
import {Home} from "../components/pages/Home" 
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";

export const Router: VFC = memo(()=>{
  return(
  <Switch>
    <Route exact path="/"><Home /></Route>
    <Route path="/login"><Login /></Route>


    <Route path="*"><Page404/></Route>
  </Switch>
  );
});