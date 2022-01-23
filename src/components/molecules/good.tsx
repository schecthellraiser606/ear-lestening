import { Box, Grid, GridItem, IconButton, Text } from "@chakra-ui/react";
import {memo, VFC} from "react";
import { BsHandThumbsUp } from "react-icons/bs";

type Prop ={
  good: number;
  onClick?: ()=>void ;
}

export const GoodComponent: VFC<Prop>= memo( (prop)=> {
  const {good, onClick} = prop
  return(
    <Grid 
    templateColumns='repeat(5, 1fr)'>
      <GridItem colSpan={3} textAlign="left">
      <Text fontSize="xl" marginTop="1.5" marginLeft="1">いいね</Text>
      </GridItem>
      <GridItem m="auto">
      <IconButton
        colorScheme='blue'
        aria-label='good'
        onClick={onClick ?? undefined}
        boxShadow="md"
        icon={<BsHandThumbsUp />}/>
      </GridItem>
      <GridItem colSpan={1} >
      <Text marginTop="1.5" fontSize="xl">: {good}</Text>
      </GridItem>
     </Grid>
  );
});