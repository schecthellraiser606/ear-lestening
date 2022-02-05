import { Box, Divider, Image, Stack, Text } from "@chakra-ui/react";
import {memo, VFC} from "react";
import { GoodSubComponent } from "../../molecules/goodSub";


type Props ={
  id: number;
  imageUrl: string;
  writer: string;
  title: string;
  artist: string;
  good: number;
  onClick: (id: number)=>void;
}

export const TabCard: VFC<Props> = memo( (props)=> {
  const {id, imageUrl, writer, title, artist, good, onClick} = props;

  return(
    <Box 
      w="360px" 
      h="400px" 
      bg="white" 
      borderRadius="10px"
      padding={4} 
      shadow="wd"
      _hover={{cursor: "pointer", opacity: 0.8}}
      onClick={()=>onClick(id)}>
    
    <Stack textAlign="center">
      <Image 
        boxSize="200px" 
        borderRadius="full"
        alt={writer}
        m="auto"
        src={imageUrl ?? undefined}/>

      <Divider my={4}/>

      <Text fontSize="lg" fontWeight="bold">作成者: {writer}</Text>
      <Text fontSize="sm" color="gray">曲名: {title}</Text>
      <Text fontSize="sm" color="gray">アーティスト名:{artist}</Text>

      <Divider my={4}/>
      <GoodSubComponent good={good}/>
    </Stack>

    </Box>
  );
});