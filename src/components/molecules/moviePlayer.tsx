import { Box } from "@chakra-ui/react";
import {memo, VFC} from "react";

type Props ={
  videoId: string;
}

export const MoviePlayer: VFC<Props> = memo( (prop)=> {
  const {videoId} = prop

  return(
    <Box m={2} shadow="lg">
     <iframe
      id={videoId}
      width="100%"
      height="360"
      src={"https://www.youtube.com/embed/" + videoId} 
      frameBorder="0"
      allowFullScreen
    />
    </Box>
  );
});