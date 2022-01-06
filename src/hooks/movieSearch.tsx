import { useCallback, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { videoState } from "../store/videoState"
import { YoutubeApi } from "../API/YouTubeAPI/apiv3Youtube"
import { youtube } from "../Types/Youtube/youtubeapi"
import axios from "axios"
import {useMessage} from "./useMessage"

type Props = {
  words: string
}

type param = {
  key?: string,
  q: string,
  type: string,
  maxResults: string,
}

export const useMovieSearch = () =>{
  const [videoInfo, setVideoInfo] = useRecoilState(videoState);
  const videoIdex = videoInfo.videoId

  const [loading, setLoading] = useState(false);
  const {showMessage} = useMessage();

  const search = useCallback(
    (props: Props) => {
      setLoading(true);

      const {words} = props;
      const apikey = YoutubeApi;
      const YOUTUBE_SERACH_API_URI = "https://www.googleapis.com/youtube/v3/search?";

      const params: param = {
        key: apikey,
        q: words, // 検索キーワード
        type: "video", // video,channel,playlistから選択できる
        maxResults: "3", // 結果の最大数
      };

      const queryParams = new URLSearchParams(params);

      axios.get<youtube>(YOUTUBE_SERACH_API_URI + queryParams)
        .then((result) => {
            console.log("API success:", result);

            if (result.data.items && result.data.items.length !== 0) {
              setVideoInfo({videoId: [""]})
              result.data.items.map((item)=>(
                setVideoInfo({videoId: [...videoIdex, item.id.videoId]})
              ))
            }
          })
        .catch(()=>{
          showMessage({ title: "Youtubeの検索に失敗しました", status: "error"})
        })
        .finally(()=>{
          setLoading(false);
        });
    }, []);

    return{ search, loading };
};