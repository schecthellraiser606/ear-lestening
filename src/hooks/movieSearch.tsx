import { useCallback, useEffect, useState } from "react"
import { URLSearchParams } from "url"
import { YoutubeApi } from "../API/YouTubeAPI/apiv3Youtube"
import { youtube } from "../Types/Youtube/youtubeapi"

type Props = {
  words: string
}

type param = {
  key?: string,
  q: string,
  type: string,
  maxResults: string,
}

export const movieSearch = () =>{
  const [videoId, setVideoId] = useState([""]);

  const search = useCallback(
    (props: Props) => {
      const {words} = props;
      const apikey = YoutubeApi;
      const YOUTUBE_SERACH_API_URI = "https://www.googleapis.com/youtube/v3/search?";

      useEffect(() => {
        const params: param = {
          key: apikey,
          q: words, // 検索キーワード
          type: "video", // video,channel,playlistから選択できる
          maxResults: "3", // 結果の最大数
        };

        const queryParams = new URLSearchParams(params);

        fetch(YOUTUBE_SERACH_API_URI + queryParams)
        .then((res) => res.json())
        .then(
          (result: youtube) => {
            console.log("API success:", result);

            if (result.items && result.items.length !== 0) {
              result.items.map((item)=>(
                setVideoId([...videoId, item.id.videoId])
              ))
            }
          },
          (error) => {
            console.error(error);
          }
        );
      },[]);

    },[],);

    return{ search, videoId };
}