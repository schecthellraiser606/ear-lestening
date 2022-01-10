import { Alert, AlertIcon, Box, Button, Divider, Heading, Stack } from "@chakra-ui/react";
import {memo, VFC} from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthHook } from "../../../hooks/user/useAuthHook";

export const GoogleLogin: VFC = memo( ()=> {
  const {userGoogleAuth, loading} = useAuthHook();

  const onClick = () => userGoogleAuth();
  return(
    <Box bg="white" padding={6} h={400}>
      <Heading fontSize="2xl">Googleアカウントでログイン</Heading>
      <Divider my={4}/>
      <Button 
      leftIcon={<FcGoogle />} 
      variant='solid'
      bgGradient='linear(blue.100 0%, cyan.100 25%, teal.100 50%)'
      marginTop={8} 
      h="40%"
      w="100%" 
      shadow="md"
      _hover={{ opacity: 0.8}} 
      disabled= {loading}
      isLoading = {loading}
      onClick={onClick} >
        Googleログイン
      </Button>

      <Alert status='info' marginTop={10} marginBottom={0}>
      <AlertIcon />
        事前にGoogleアカウントを作成してください。
      </Alert>
    </Box>
  );
});