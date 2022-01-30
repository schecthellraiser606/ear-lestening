import { Flex, Stack, Text, Textarea } from "@chakra-ui/react";
import { ChangeEvent, memo, useEffect, VFC} from "react";

type Props ={
  isEditor: boolean;
  data?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>)=>void;
} 

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
      editor?: string
  }
}

export const VexTabComponent: VFC<Props> = memo((prop)=> {
  const {data, isEditor, onChange} = prop

  useEffect(() => {
    const head = document.getElementsByTagName('head')[0] as HTMLElement;
    const scriptUrl = document.createElement('script');
    scriptUrl.type = 'text/javascript';
    scriptUrl.src = 'https://unpkg.com/vextab/releases/div.prod.js';
    head.appendChild(scriptUrl);
}, [data]);

  return(
    <Flex>
    <Stack>
    <div className="vextab-auto" editor="false" style={{whiteSpace: 'pre-line'}}>
    {data}
    </div>
    {isEditor && (
      <>
      <Text>編集スペース</Text>
      <Textarea value={data} onChange={onChange} h="xl" />
      </>
    )} 
    </Stack>
    </Flex>
  );
  
});