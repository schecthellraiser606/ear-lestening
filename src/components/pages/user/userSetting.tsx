import { Box, Button, Divider, Flex, FormControl, Heading, Input, InputRightElement, Stack } from "@chakra-ui/react";
import {ChangeEvent, memo, useState, VFC} from "react";
import { getAuth } from "firebase/auth";
import { TopLayout } from "../../organisms/layout/TopLayout";
import { useAuthHook } from "../../../hooks/user/useAuthHook";
import { SecondaryButton } from "../../atoms/buttons/SecondaryButton";

export const UserSetting: VFC = memo( ()=> {
  const auth = getAuth();
  const signInUser = auth.currentUser;
  const {loading, userUpdateName, userUpdateEmail, userSignOut } = useAuthHook();

  const [name, setName] = useState(signInUser?.displayName ? (signInUser.displayName):(""));
  const [email, setEmail] = useState(signInUser?.email ? (signInUser.email) : (""));

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const onClickUpdateName = () => userUpdateName(name);
  const onClickUpdatteEmail = () => userUpdateEmail(email); 
  const onClickLogout = () => userSignOut();


  return(
    
    <TopLayout>
      <Flex align="center" justify="center" height="100vh">
      <Box bg="white" padding={6} >
      <Heading fontSize="2xl">ユーザ情報</Heading>
      <Divider my={4}/>

      <Stack textAlign="center">
        <FormControl>ユーザ名</FormControl>
        <Input value={  name } onChange={onChangeName} isReadOnly={false}/>
        <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={onClickUpdateName} isLoading={loading}>
          ユーザ名変更
        </Button>
        </InputRightElement>

        <FormControl>Email Address</FormControl>
        <Input value={ email } onChange={onChangeEmail} isReadOnly={false}/>
        <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={onClickUpdatteEmail} isLoading={loading}>
          Email Address変更
        </Button>
        </InputRightElement>
      </Stack>
      <Divider my={5}/>

      <SecondaryButton disable={false} loading={loading} onClick={onClickLogout}>
        ログアウト
      </SecondaryButton>


      </Box>
      </Flex>
    </TopLayout>
  );
});