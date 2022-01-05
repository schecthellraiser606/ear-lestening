import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import {memo, VFC} from "react";

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
            <Button w="100%" onClick={onClickHome}>TOP</Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});