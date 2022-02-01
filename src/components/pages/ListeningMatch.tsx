import { Divider, Grid, GridItem, Heading, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import {memo, useCallback, VFC} from "react";
import { useRecoilValue } from "recoil";
import { videoState } from "../../store/videoState";
import { MoviePlayer } from "../molecules/moviePlayer";
import { TabCard } from "../organisms/card/TabCard";
import { useSelectTab } from "../../hooks/tab/tabSelect";
import { TabModal } from "../organisms/modal/TabModal";
import { searchTabStateArtist } from "../../store/dbreturn01";
import { searchTabStateTitle } from "../../store/dbReturn02";
import { CreateTabButtom } from "../molecules/CreateTabButtom";
import { userState } from "../../store/userState";


export const ListeningMartch: VFC = memo( ()=> {
  const user = useRecoilValue(userState)
  
  const tab02 = useRecoilValue(searchTabStateTitle);
  const tab01 = useRecoilValue(searchTabStateArtist);
  const tabs = [...tab01, ...tab02]
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
    {user?.uid && (
      <CreateTabButtom /> 
    )}

    <Heading as="h1" size="lg" m={4}>
      Tab一覧
    </Heading>

    <Wrap p={{base: 4, md: 10}} justify="space-around">
    {tabs.map((tab, index)=>(
        <WrapItem key={tab.id} mx="auto">
          <TabCard
            id={tab.id}
            imageUrl={thumnail[index % 3]}
            writer={tab.writer}
            title={tab.title}
            artist={tab.artist}
            good={tab.good}
            onClick={onClick} 
            />
        </WrapItem>
      ))}
    </Wrap>

    <TabModal maindata={selectedTab} isOpen={isOpen} onClose={onClose} isEditor={user?.uid === selectedTab?.userId ? true : false}/>

    </>
  );
});