import { Box, Button, Divider, FormControl, FormLabel, Heading, Input, InputRightElement, Stack } from "@chakra-ui/react";
import {ChangeEvent, memo, useState, VFC} from "react";
import { useAuthHook } from "../../../hooks/user/useAuthHook";
import { PrimaryButton } from "../../atoms/buttons/PrimaryButtom";

export const MailLogin: VFC = memo( ()=> {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const {userSignIn, loading} = useAuthHook();

  const isErrorEmail = inputEmail === '';
  const isErrorPass = inputPass === '';

  const handleInputEmailChange = (e:ChangeEvent<HTMLInputElement>) => setInputEmail(e.target.value);
  const handleInputPassChange = (e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value);
  const handleClickShow = () => setShow(!show);

  const onClickLogin = () => userSignIn(inputEmail, inputPass)


  return(
    <Box bg="white" padding={6} h={330}>
    <Heading fontSize="2xl">Emailログイン</Heading>
    <Divider my={4}/>
    <Stack p={2}>
    <FormControl isInvalid={isErrorEmail} isRequired>
    <FormLabel htmlFor='email'>Email Address</FormLabel>
      <Input
        id='emailId'
        type='email'
        value={inputEmail}
        placeholder='taro@example.com'
        onChange={handleInputEmailChange} 
      />
    </FormControl>

    <FormControl isInvalid={isErrorPass} isRequired>
    <FormLabel htmlFor='email'>Password</FormLabel>
      <Input
        id='passId'
        type={show ? 'text' : 'password'}
        value={inputPass}
        placeholder='Enter password'
        onChange={handleInputPassChange}
      />
      <InputRightElement width='4.5rem'>
      <Button h='1.75rem' size='sm' onClick={handleClickShow}>
        {show ? 'Hide' : 'Show'}
      </Button>
      </InputRightElement>
    </FormControl>

    <PrimaryButton 
        onClick={onClickLogin}
        loading={loading}
        disable={inputEmail === "" || inputPass ===""} >
        ログイン
      </PrimaryButton>
    </Stack>

    </Box>
  );
});