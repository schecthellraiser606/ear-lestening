import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Input, InputRightElement, Stack } from "@chakra-ui/react";
import {ChangeEvent, memo, useState, VFC} from "react";
import { useAuthHook } from "../../../hooks/user/useAuthHook";
import { PrimaryButton } from "../../atoms/buttons/PrimaryButtom";
import { InputEmail } from "../../atoms/Input/EmailInput";
import { InputPassword } from "../../atoms/Input/PasswordInput";
import { TopLayout } from "../../organisms/layout/TopLayout";

export const UserCreate: VFC = memo( ()=> {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const {userSignUp, loading} = useAuthHook();

  const isErrorEmail = inputEmail === '';
  const isErrorPass = inputPass === '';

  const handleInputEmailChange = (e:ChangeEvent<HTMLInputElement>) => setInputEmail(e.target.value);
  const handleInputPassChange = (e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value);
  const handleClickShow = () => setShow(!show);

  const onClickCreate = () => userSignUp(inputEmail, inputPass)


  return(
    <TopLayout>
    <Flex align="center" justify="center" height="100vh">
    <Box bg="white" padding={6} >
    <Heading fontSize="2xl">Emailアドレスでユーザを作成</Heading>
    <Divider my={4}/>
    <Stack p={2}>

    <InputEmail isErrorEmail={isErrorEmail} inputEmail={inputEmail} onChange={handleInputEmailChange} />

    <InputPassword isErrorPass={isErrorPass} show={show} inputPass={inputPass} onChange={handleInputPassChange} onClick={handleClickShow} />

    <PrimaryButton 
        onClick={onClickCreate}
        loading={loading}
        disable={inputEmail === "" || inputPass ===""} >
        ユーザを作成
      </PrimaryButton>
    </Stack>

    </Box>
    </Flex>
    </TopLayout>
  );
});