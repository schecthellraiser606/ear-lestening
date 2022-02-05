import { Alert, AlertIcon, Box, Button, Divider, Heading} from "@chakra-ui/react";
import {memo, VFC} from "react";
import { FcGoogle } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useGoodDbHook } from "../../../hooks/db/goodDb";
import { useAuthHook } from "../../../hooks/user/useAuthHook";
import { userState } from "../../../store/userState";

export const GoogleLogin: VFC = memo( ()=> {
  const history = useHistory();
  const {userGoogleAuth, loading} = useAuthHook();
  const {searchUserId, loadingGoodStore} = useGoodDbHook();
  const user = useRecoilValue(userState);

  const onClick = () => {
    try{
      userGoogleAuth();
      searchUserId(user?.uid);
    }finally{
      history.push('/');
    }
  }
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
      isLoading = {loading || loadingGoodStore}
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