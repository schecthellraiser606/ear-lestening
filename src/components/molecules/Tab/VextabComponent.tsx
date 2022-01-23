import { Flex } from "@chakra-ui/react";
import {memo, useEffect, VFC} from "react";

type Props ={
  editor: string;
  data?: string;
} 

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
      editor?: string
  }
}

export const VexTabComponent: VFC<Props> = memo((prop)=> {
  const {editor, data} = prop
  const br = "\n"

  useEffect(() => {
    const head = document.getElementsByTagName('head')[0] as HTMLElement;
    const scriptUrl = document.createElement('script');
    scriptUrl.type = 'text/javascript';
    scriptUrl.src = 'https://unpkg.com/vextab/releases/div.prod.js';
    head.appendChild(scriptUrl);
}, []);

  return(
    <Flex>
    <div className="vextab-auto" editor={editor} style={{whiteSpace: 'pre-line'}}>
    {data}
    </div> 
    </Flex>
  );
  
});