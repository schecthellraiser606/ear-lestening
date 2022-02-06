import { Button } from "@chakra-ui/react";
import {memo, VFC} from "react";

type Prop ={
  good: number;
  onClick?: ()=>void ;
  status: boolean | undefined;
  disable: boolean;
}

export const GoodComponent: VFC<Prop>= memo( (prop)=> {
  const {good, onClick, status, disable = true} = prop

  return(
   <Button onClick={onClick} disabled={disable} color="white" backgroundColor={status? `#FF3333`: `#FF99CC`}>♥ {good}</Button>
  );
});