import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Heading, Stack } from "@chakra-ui/react";
import {ChangeEvent, memo, useState, VFC} from "react";
import { validate } from 'email-validator';
import { useHistory } from "react-router-dom";
import { useAuthHook } from "../../../hooks/user/useAuthHook";
import { PrimaryButton } from "../../atoms/buttons/PrimaryButtom";
import { InputEmail } from "../../atoms/Input/EmailInput";
import { InputPassword } from "../../atoms/Input/PasswordInput";

export const MailLogin: VFC = memo( ()=> {
  const history = useHistory();

  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const {userSignIn, loading} = useAuthHook();

  const isErrorEmail = !validate(inputEmail);
  const isErrorPass = inputPass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{10,}$/) ? false : true;

  const handleInputEmailChange = (e:ChangeEvent<HTMLInputElement>) => setInputEmail(e.target.value);
  const handleInputPassChange = (e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value);
  const handleClickShow = () => setShow(!show);

  const onClickLogin = async() =>{ 
    try{
      userSignIn(inputEmail, inputPass) ;
    }finally{
      history.push('/');
    }
  }
  const onClickCreateUser = () => history.push('/account_create')


  return(
    <Box bg="white" padding={6} h={430}>
    <Heading fontSize="2xl">Emailログイン</Heading>
    <Divider my={4}/>
    <Stack p={2}>

    <InputEmail isErrorEmail={isErrorEmail} inputEmail={inputEmail} onChange={handleInputEmailChange} />

    <InputPassword isErrorPass={isErrorPass} show={show} inputPass={inputPass} onChange={handleInputPassChange} onClick={handleClickShow} />

    <PrimaryButton 
        onClick={onClickLogin}
        loading={loading}
        disable={isErrorEmail || isErrorPass} >
        ログイン
    </PrimaryButton>
    </Stack>

    <Divider my={4}/>

    <Button 
      rightIcon={<ArrowForwardIcon />} 
      colorScheme='cyan' 
      variant='outline'
      onClick={onClickCreateUser}>
    アカウントを新規作成
  </Button>

    </Box>
  );
});