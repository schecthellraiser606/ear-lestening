import { Button, Divider, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Stack, Text } from "@chakra-ui/react";
import {memo, VFC} from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/userState";
import { SecondaryButton } from "../atoms/buttons/SecondaryButton";
import { InputAndSearch } from "../atoms/Input/InputAndSearch";
import { AvatorSignInUser } from "./avatorSignInUser";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickHome: () => void;
};

export const MenuDrawer: VFC<Props> = memo( (props)=> {
  const {onClose, isOpen, onClickHome} = props
  const history = useHistory();

  const signInUser=  useRecoilValue(userState);

  const onClickLogin = () => history.push('/login')

  return(
    <Drawer placement="right" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
          <Stack spacing={3} px={5} py={2}>
            <Button 
              w="100%" 
              backgroundColor="cyan.500" 
              color="white"
              onClick={onClickHome}>
                みんなの耳コピ</Button>
            <Divider my={4}/>
            
            <Text fontSize="lg" >ユーザ管理</Text>
            {signInUser?.uid ?
               <AvatorSignInUser /> : 
               <Stack>
                 <SecondaryButton disable={false} loading={false} onClick={onClickLogin} >ログイン</SecondaryButton>
               </Stack>}
            <Divider my={4}/>
            <Text fontSize="lg" >楽曲検索</Text>
            <InputAndSearch/>
          </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});