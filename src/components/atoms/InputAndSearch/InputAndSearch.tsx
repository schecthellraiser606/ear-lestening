import { Input } from "@chakra-ui/react";
import {memo, VFC} from "react";

export const Home: VFC = memo( ()=> {
  return(
    <Input placeholder='アーティスト or 曲名' />
  );
});