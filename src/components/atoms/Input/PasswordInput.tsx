import { Button, FormControl, FormLabel, Input, InputRightElement, Text } from "@chakra-ui/react";
import {ChangeEvent, memo, VFC} from "react";

type Props = {
  isErrorPass: boolean; 
  show: boolean;
  inputPass: string;
  onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
  onClick: ()=>void;
}

export const InputPassword: VFC<Props> = memo( (prop)=> {
  const {isErrorPass, inputPass, show, onChange, onClick} = prop;

  return(
    <FormControl isInvalid={isErrorPass} isRequired>
    <FormLabel htmlFor='email'>Password</FormLabel>
    <Text color="orange">※10文字以上の大文字を含む英数字</Text>
      <Input
        id='passId'
        type={show ? 'text' : 'password'}
        value={inputPass}
        placeholder='Enter password'
        onChange={onChange}
      />
      <InputRightElement width='4.5rem'>
      <Button h='1.75rem' size='sm' onClick={onClick}>
        {show ? 'Hide' : 'Show'}
      </Button>
      </InputRightElement>
    </FormControl>
  );
});