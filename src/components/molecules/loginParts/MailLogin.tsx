import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import {ChangeEvent, memo, useState, VFC} from "react";

export const MailLogin: VFC = memo( ()=> {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const isErrorEmail = inputEmail === '';
  const isErrorPass = inputPass === '';
  const handleInputEmailChange = (e:ChangeEvent<HTMLInputElement>) => setInputEmail(e.target.value);
  const handleInputPassChange = (e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value);
  const handleClickShow = () => setShow(!show);


  return(
    <Flex>
      <Box bg="white">
      <Text>Emailログイン</Text>
      <Stack>

      <InputGroup>
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
      <FormLabel htmlFor='email'>Email Address</FormLabel>
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
      </InputGroup>

      </Stack>
      </Box>
    </Flex>
  );
});