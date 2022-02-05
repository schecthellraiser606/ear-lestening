import { Box, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaYoutube } from 'react-icons/fa';
import {ChangeEvent, memo, useState, VFC} from "react";
import { SearchButton } from "../buttons/SearchButtom";
import {useMovieSearch} from "../../../hooks/movieSearch"
import { useDbHook } from "../../../hooks/db/dbhooks";
import { useHistory } from "react-router-dom";
import { useGoodDbHook } from "../../../hooks/db/goodDb";
import { userState } from "../../../store/userState";
import { useRecoilValue } from "recoil";

export const InputAndSearch: VFC = memo( ()=> {
  const {search, loading} = useMovieSearch();
  const { searchTab, loadingStore} = useDbHook();
  const [word, setWord] = useState("");
  const user = useRecoilValue(userState)
  const {loadingGoodStore,searchUserId} = useGoodDbHook();

  const history = useHistory();

  const onChangeWord = (e:ChangeEvent<HTMLInputElement>) => setWord(e.target.value);

  const onClickSerch = () => {
    try{
    search({words:word})
    searchTab(word)
    searchUserId(user?.uid);
    }finally{
    history.push('/search_result')
    }
  }

  return(
    <Flex justify="center">
      <Box >
        <InputGroup>
        <InputLeftElement
      pointerEvents='none'
      children={<FaYoutube color="red" size={20}/>}
    />
        <Input 
          borderLeftRadius={9}
          borderRightRadius={0}
          backgroundColor="white" 
          color="black"
          placeholder='アーティスト, 曲名' 
          value={word} 
          onChange={onChangeWord}/>
          </InputGroup>
      </Box>
      <Box>
      <SearchButton 
        onClick={onClickSerch}
        loading={loading || loadingStore || loadingGoodStore}
        disable={word===""} 
        >検索</SearchButton>
      </Box>
    </Flex>
  );
});