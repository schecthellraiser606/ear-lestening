import { Divider, Flex } from "@chakra-ui/react";
import {memo, VFC} from "react";
import { GoogleLogin } from "../molecules/loginParts/GoogleLogin";
import { MailLogin } from "../molecules/loginParts/MailLogin";
import { TopLayout } from "../organisms/layout/TopLayout";


export const Login: VFC = memo( ()=> {
  return(
    <TopLayout>
      <Flex align="center" justify="center" height="100vh">
        <MailLogin />
        <Divider h={330} orientation='vertical' />
        <GoogleLogin/>
      </Flex>
    </TopLayout>
  );
});