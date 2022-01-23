import { Divider, Flex, Grid, GridItem, Heading, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import {memo, useCallback, useState, VFC} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { videoState } from "../../store/videoState";
import { MoviePlayer } from "../molecules/moviePlayer";
import { TabCard } from "../organisms/card/TabCard";
import { useSelectTab } from "../../hooks/tab/tabSelect";
import { TabModal } from "../organisms/modal/TabModal";
import { useAllTab } from "../../test/testUser";


export const Listening_martch: VFC = memo( ()=> {
  const {tabs} = useAllTab();

  const videoInfo = useRecoilValue(videoState);
  const videoIdex = videoInfo.videoId
  const videoWord = videoInfo.word
  const thumnail = videoInfo.thumnailsURL

  const {isOpen, onOpen, onClose} = useDisclosure();

  const {onSelectTab, selectedTab} = useSelectTab();

  const onClick = useCallback((id: number) => {
    onSelectTab({id, tabs, onOpen})
  }, [tabs, onSelectTab, onOpen]);

  return(
    <>
    <Heading as="h1" size="lg" m={4}>
      検索結果: {videoWord}
    </Heading>
    <Grid 
      h='378px'
      templateColumns='repeat(3, 1fr)' 
      gap={2}
      backgroundColor="cyan.100">
      
      {videoIdex.map((id) => (
        <GridItem w="100%">
          <MoviePlayer videoId={id}/>
        </GridItem>
      ))}

    </Grid>
    <Divider my={4}/>
    <Wrap p={{base: 4, md: 10}} justify="space-around">
    {tabs.map((tab, index)=>(
        <WrapItem key={tab.id} mx="auto">
          <TabCard
            id={tab.id}
            imageUrl={thumnail[index]}
            writer={tab.writer}
            title={tab.title}
            artist={tab.artist}
            good={tab.good}
            onClick={onClick} 
            />
        </WrapItem>
      ))}
    </Wrap>

    <TabModal maindata={selectedTab} isOpen={isOpen} onClose={onClose} isEditor={true}/>

    </>
  );
});