import { Button } from "@chakra-ui/react";
import {memo, VFC} from "react";

type Prop ={
  good: number;
  onClick?: ()=>void ;
  status: boolean;
  disable: boolean;
}

export const GoodComponent: VFC<Prop>= memo( (prop)=> {
  const {good, onClick, status = false, disable = true} = prop

  return(
   <Button onClick={onClick} disabled={disable} color="white" backgroundColor={status? `#FF99CC`: `#FF3333`}>♥ {good}</Button>
  );
});