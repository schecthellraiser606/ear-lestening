import {memo, VFC} from "react";
import { VexTabComponent } from "../molecules/Tab/VextabComponent";
import { VexTabType } from "../../Types/tab/vextab";

export const One_Listening: VFC = memo( ()=> {
  const Object: VexTabType ={
    editor: "true",
    tuningkey: "E",
    tuning: "eb",
    data: "notes (8/2.7b9b7/3) (5b6/2.5b6/3) 7/4 | (5/2.6/3.7/4)"
  } 

  return(
    <VexTabComponent tuningkey={Object.tuningkey} editor={Object.editor} tuning={Object.tuning} data={Object.data} />
  );
});