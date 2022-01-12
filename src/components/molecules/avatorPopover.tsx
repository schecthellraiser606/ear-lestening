import {memo, VFC} from "react";
import { Popover,PopoverTrigger,PopoverContent, PopoverHeader, PopoverBody,PopoverArrow,PopoverCloseButton,IconButton, Portal, Avatar, Stack} from "@chakra-ui/react"
import { useHistory } from "react-router-dom";
import { SecondaryButton } from "../atoms/buttons/SecondaryButton";
import { AvatorSignInUser } from "./avatorSignInUser";
import { userState } from "../../store/userState";
import { useRecoilValue } from "recoil";


export const AvatorPopover: VFC = memo( ()=> {
  const history = useHistory();
  
  const signInUser=  useRecoilValue(userState);

  const onClickLogin = () => history.push('/login')
  
  return(
    <Popover>
    <PopoverTrigger >
        <IconButton 
          aria-label='UserAvator' 
          size='lg'
          variant='unstyled'
          icon={<Avatar />} />
    </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
            <PopoverHeader>
            {signInUser?.uid ?
               "ユーザ管理" : 
               "ログインを行なってください"}
            </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
          {signInUser?.uid ?
               <AvatorSignInUser /> : 
               <Stack>
                 <SecondaryButton disable={false} loading={false} onClick={onClickLogin} >ログイン</SecondaryButton>
               </Stack>}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
});