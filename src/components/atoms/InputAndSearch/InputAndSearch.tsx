import { Box, Flex, Input } from "@chakra-ui/react";
import {ChangeEvent, memo, useState, VFC} from "react";
import { PrimaryButton } from "../buttons/PrimaryButtom";
import {useMovieSearch} from "../../../hooks/movieSearch"

export const InputAndSearch: VFC = memo( ()=> {
  const {search, loading} = useMovieSearch();
  const [word, setWord] = useState("");
  const onChangeWord = (e:ChangeEvent<HTMLInputElement>) => setWord(e.target.value);

  const onClickSerch = () => search({words:word})

  return(
    <Flex justify="center">
      <Box>
        <Input placeholder='アーティスト or 曲名' value={word} onChange={onChangeWord}/>
      </Box>
      <Box>
      <PrimaryButton 
        onClick={onClickSerch}
        loading={loading}
        disable={word===""} 
        >検索</PrimaryButton>
      </Box>
    </Flex>
  );
});