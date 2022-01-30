import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import {memo, VFC} from "react";
import { UserModel01 } from "../../test/testUser";
import { SecondaryButton } from "../atoms/buttons/SecondaryButton";
import { CreateTabData } from "../organisms/modal/createTabData";

export const CreateTabButtom: VFC = memo( ()=> {

  const {isOpen, onOpen, onClose} = useDisclosure();

  return(
    <Flex align="center" justify="center">
    <Box bg="white" p={4} borderRadius="md" shadow="md" textAlign="center">
    <SecondaryButton onClick={onOpen}>
    Tabを新規作成
    </SecondaryButton>
    <CreateTabData maindata={UserModel01} isOpen={isOpen} onClose={onClose} /> 
    </Box>
  </Flex>
  );
});