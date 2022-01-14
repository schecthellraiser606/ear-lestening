import { Box, Divider, Flex, FormControl, Heading, Input, Stack } from "@chakra-ui/react";
import {ChangeEvent, memo, useState, VFC} from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { TopLayout } from "../../organisms/layout/TopLayout";

export const UserSetting: VFC = memo( ()=> {
  const auth = getAuth();
  const signInUser = auth.currentUser;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  return(
    <TopLayout>
    <Flex align="center" justify="center" height="100vh">
    <Box bg="white" padding={6} >
    <Heading fontSize="2xl">ユーザ情報</Heading>
    <Divider my={4}/>

    <Stack textAlign="center">
      <FormControl>ユーザ名</FormControl>
      <Input value={ signInUser?.displayName || "" } onChange={onChangeName} isReadOnly={false}/>
      <FormControl>Email Address</FormControl>
      <Input value={ signInUser?.email || "" } onChange={onChangeEmail} isReadOnly={false}/>
    </Stack>

    </Box>
    </Flex>
    </TopLayout>
  );
});