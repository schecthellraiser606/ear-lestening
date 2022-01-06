import { Button, Divider, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Stack } from "@chakra-ui/react";
import {memo, VFC} from "react";
import { InputAndSearch } from "../atoms/Input/InputAndSearch";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickHome: () => void;
};

export const MenuDrawer: VFC<Props> = memo( (props)=> {
  const {onClose, isOpen, onClickHome} = props

  return(
    <Drawer placement="right" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
          <Stack spacing={3} px={5} py={2}>
            <Button 
              w="100%" 
              backgroundColor="cyan.500" 
              color="white"
              onClick={onClickHome}>
                みんなの耳コピ</Button>
              <Divider my={4}/>
            <InputAndSearch/>
          </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});