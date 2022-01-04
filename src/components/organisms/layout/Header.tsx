import { Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router-dom";

export const Header: VFC = memo( ()=> {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();
  const onClickHome = useCallback(() => history.push("/"), [history]);


  return(
    <>
    <Flex 
      as="nav" 
      bg="cyan.600" 
      color="gray.50"
      align="center"
      justify="space-between"
      padding={{base:3, md:5}}>

        <Flex align="center" as="a" mr={8} _hover={{cursor:"pointer"}} onClick={onClickHome}>
        <Heading as="h1" fontSize={{ base:"md", md:"lg" }}>みんなの耳コピ</Heading></Flex>

      </Flex>

    </>);
});