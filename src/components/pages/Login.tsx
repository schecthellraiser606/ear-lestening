import {memo, VFC} from "react";
import { MailLogin } from "../molecules/loginParts/MailLogin";

export const Login: VFC = memo( ()=> {
  return(
    <MailLogin />
  );
});