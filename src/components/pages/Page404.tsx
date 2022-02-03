import { Box, Divider, Flex, Heading, Image } from "@chakra-ui/react";
import {memo, VFC} from "react";
import { TopLayout } from "../organisms/layout/TopLayout";

export const Page404: VFC = memo( ()=> {
  const photoURL = "https://source.unsplash.com/sxiSod0tyYQ"

  return(
    <TopLayout>
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
      <Heading as="h1" size="lg" textAlign = "center">ページが見つかりません</Heading>
      <Divider my={4}/>
      <Image 
        boxSize="auto" 
        borderRadius="sm"
        m="auto"
        src={photoURL ?? undefined}/>
      </Box>
    </Flex>
    </TopLayout>
  );
});