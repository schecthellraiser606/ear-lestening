import {memo, VFC} from "react";
import { MailLogin } from "../molecules/login/MailLogin";

export const Login: VFC = memo( ()=> {
  return(
    <MailLogin />
  );
});