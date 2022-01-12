import { Stack } from "@chakra-ui/react";
import {memo, VFC} from "react";
import { useHistory } from "react-router-dom";
import { useAuthHook } from "../../hooks/user/useAuthHook";
import { SecondaryButton } from "../atoms/buttons/SecondaryButton";

export const AvatorSignInUser: VFC = memo( ()=> {
  const history = useHistory();
  const {userSignOut} = useAuthHook();

  const onClickUserSetting = () => history.push('/user/setting')
  const onClickLogout = () => userSignOut();

  return(
    <Stack>
    <SecondaryButton disable={false} loading={false} onClick={onClickUserSetting}>ユーザページ</SecondaryButton>
    <SecondaryButton disable={false} loading={false} onClick={onClickLogout}>ログアウト</SecondaryButton>
    </Stack>
  );
});