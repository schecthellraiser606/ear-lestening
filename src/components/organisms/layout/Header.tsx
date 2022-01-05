import { Avatar, Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router-dom";
import { MenuIconButton } from "../../atoms/buttons/MenuIconButton";
import { InputAndSearch } from "../../atoms/Input/InputAndSearch";
import { MenuDrawer } from "../../molecules/menuDrawer";

export const Header: VFC = memo( ()=> {
  const { isOpen, onOpen, onClose, } = useDisclosure();

  const history = useHistory();
  const onClickHome = useCallback(() => history.push("/"), [history]);
  const onClickAboutUser = useCallback(() => history.push("/"), [history]);


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
        <Heading as="h1" fontSize={{ base:"md", md:"2xl" }}>みんなの耳コピ</Heading></Flex>

        <Flex 
        align="center" 
        fontSize="sm" 
        display={{base:"none", md:"flex"}}>
        
        <Box pr={4}>
        <Avatar >
          <Link onClick={onClickAboutUser}></Link>
        </Avatar>
        </Box>

        <InputAndSearch />

        </Flex>

        <MenuIconButton onOpen = {onOpen} />

      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} onClickHome={onClickHome} />

    </>);
});