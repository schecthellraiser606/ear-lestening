import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import {memo, VFC} from "react";
import { useRecoilState } from "recoil";
import { videoState } from "../../store/videoState";
import { MoviePlayer } from "../molecules/moviePlayer";

export const Listening_martch: VFC = memo( ()=> {
  const [videoInfo, setVideoInfo] = useRecoilState(videoState);
  const videoIdex = videoInfo.videoId
  const videoWord = videoInfo.word

  return(
    <>
    <Heading as="h1" size="lg" m={4}>
      検索結果: {videoWord}
    </Heading>
    <Grid 
      h='200px'
      templateColumns='repeat(3, 1fr)' 
      gap={2}>
      
      {videoIdex.map((id) => (
        <GridItem w="100%">
          <MoviePlayer videoId={id}/>
        </GridItem>
      ))}

    </Grid>
    </>
  );
});