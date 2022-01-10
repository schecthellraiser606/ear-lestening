import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import {ChangeEvent, memo, VFC} from "react";

type Props = {
  isErrorEmail: boolean; 
  inputEmail: string;
  onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
}

export const InputEmail: VFC<Props> = memo( (prop)=> {
  const {isErrorEmail, inputEmail, onChange} = prop;

  return(
    <FormControl isInvalid={isErrorEmail} isRequired>
    <FormLabel htmlFor='email'>Email Address</FormLabel>
      <Input
        id='emailId'
        type='email'
        value={inputEmail}
        placeholder='taro@example.com'
        onChange={onChange} 
      />
    </FormControl>
  );
});