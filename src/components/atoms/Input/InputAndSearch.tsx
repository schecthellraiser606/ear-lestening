import { Box, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaYoutube } from 'react-icons/fa';
import {ChangeEvent, memo, useState, VFC} from "react";
import { SearchButton } from "../buttons/SearchButtom";
import {useMovieSearch} from "../../../hooks/movieSearch"

export const InputAndSearch: VFC = memo( ()=> {
  const {search, loading} = useMovieSearch();
  const [word, setWord] = useState("");
  const onChangeWord = (e:ChangeEvent<HTMLInputElement>) => setWord(e.target.value);

  const onClickSerch = () => search({words:word})

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
        loading={loading}
        disable={word===""} 
        >検索</SearchButton>
      </Box>
    </Flex>
  );
});