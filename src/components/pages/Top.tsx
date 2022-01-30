import { Box, Divider, Flex, Heading} from "@chakra-ui/react";
import {memo, VFC} from "react";
import { InputAndSearch } from "../atoms/Input/InputAndSearch";
import { TopLayout } from "../organisms/layout/TopLayout";

export const Top: VFC = memo( ()=> {
  return(
    <TopLayout>
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
      <Heading as="h1" size="lg" textAlign = "center">楽曲検索♪</Heading>
      <Divider my={4}/>
      <InputAndSearch />
      </Box>
    </Flex>
    </TopLayout>
  );
});