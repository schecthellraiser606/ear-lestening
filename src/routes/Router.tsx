import {memo, VFC} from "react";
import { Switch, Route } from "react-router-dom";
import {Home} from "../components/pages/Home" 

export const Router: VFC = memo(()=>{
  return(
  <Switch>
    <Route exact path="/"><Home /></Route>
    <Route ></Route>
  </Switch>
  );
});