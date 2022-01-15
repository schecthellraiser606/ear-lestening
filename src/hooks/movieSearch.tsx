import { useCallback, useState } from "react"
import { useRecoilState } from "recoil"
import { videoState } from "../store/videoState"
import { YoutubeApi } from "../API/YouTubeAPI/apiv3Youtube"
import { youtube } from "../Types/Youtube/youtubeapi"
import axios from "axios"
import {useMessage} from "./useMessage"
import { useHistory } from "react-router-dom"

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

  const [loading, setLoading] = useState(false);
  const {showMessage} = useMessage();

  const history = useHistory();

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
              setVideoInfo({videoId:[], word: ""})
              const firstItem = result.data.items[0];
              const SecondItem = result.data.items[1];
              const ThirdItem = result.data.items[2];
              setVideoInfo({videoId:[
                firstItem.id.videoId,
                SecondItem.id.videoId,
                ThirdItem.id.videoId,
              ], word:words})
              

              console.log(videoInfo.videoId)

              history.push('/search_result')
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