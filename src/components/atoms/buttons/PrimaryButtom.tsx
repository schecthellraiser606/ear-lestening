import { Button } from "@chakra-ui/react";
import {memo, ReactNode, VFC} from "react";

type Props = {
  children: ReactNode;
  disable?: boolean;
  loading?: boolean;
  onClick: () =>void;
};

export const PrimaryButton: VFC<Props> = memo( (props)=> {
  const {children, disable = false, loading= false, onClick} = props;

  return( 
    <Button 
      bg="green.700" 
      color="white"
      borderLeftRadius={0} 
      borderRightRadius={9}
      _hover={{ opacity: 0.8}} 
      disabled= {disable || loading}
      isLoading = {loading}
      onClick={onClick} >
      {children}
    </Button>
  );
});