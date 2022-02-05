import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Input, InputRightElement, Spacer, Stack } from "@chakra-ui/react";
import {ChangeEvent, memo, useState, VFC} from "react";
import { getAuth } from "firebase/auth";
import { TopLayout } from "../../organisms/layout/TopLayout";
import { useAuthHook } from "../../../hooks/user/useAuthHook";
import { SecondaryButton } from "../../atoms/buttons/SecondaryButton";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { useDbHook } from "../../../hooks/db/dbhooks";
import { useGoodDbHook } from "../../../hooks/db/goodDb";

export const UserSetting: VFC = memo( ()=> {
  const auth = getAuth();
  const signInUser = auth.currentUser;
  const {loading, userUpdateName, userUpdateEmail, userSignOut } = useAuthHook();
  const {loadingGoodStore,searchUserId} = useGoodDbHook();

  const history = useHistory();

  const { searchUserTab, loadingStore} = useDbHook();

  const [name, setName] = useState( signInUser?.displayName ?? "");
  const [email, setEmail] = useState(signInUser?.email ?? "");

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const onClickUpdateName = () => userUpdateName(name);
  const onClickUpdatteEmail = () => userUpdateEmail(email); 
  const onClickLogout = () => userSignOut();

  const onClickUserTab = () =>{
    try{
      searchUserTab(signInUser?.uid);
      searchUserId(signInUser?.uid);
    }finally{
      history.push('/user_setting/Tabs')
    }
  }


  return(
    
    <TopLayout>
      <Flex align="center" justify="center" height="100vh">
      <Box bg="white" padding={6} w="lg" >
      <Heading fontSize="2xl">ユーザ情報</Heading>
      <Divider my={4}/>

      <Stack textAlign="center">
        <FormControl>
        <FormLabel>ユーザ名</FormLabel>
        <Input value={ name } onChange={onChangeName} isReadOnly={false}/>
        <InputRightElement>
        <Button size='sm' onClick={onClickUpdateName} isLoading={loading}>
          変更
        </Button>
        </InputRightElement>
        </FormControl>

        <Spacer/>

        <FormControl>
        <FormLabel>Email Address</FormLabel>
        <Input value={ email } onChange={onChangeEmail} isReadOnly={false}/>
        <InputRightElement>
        <Button size='sm' onClick={onClickUpdatteEmail} isLoading={loading}>
          変更
        </Button>
        </InputRightElement>
        </FormControl>
      </Stack>
      <Divider my={4}/>

      <Button 
        rightIcon={<ArrowForwardIcon />} 
        colorScheme='cyan' 
        variant='outline'
        isLoading={loadingStore || loadingGoodStore}
        onClick={onClickUserTab}>
          My Tab 一覧へ
      </Button>

      <Divider my={6}/>

      <Box textAlign="right">
      <SecondaryButton disable={false} loading={loading} onClick={onClickLogout}>
        ログアウト
      </SecondaryButton>
      </Box>


      </Box>
      </Flex>
    </TopLayout>
  );
});