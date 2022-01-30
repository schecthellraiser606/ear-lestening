import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { db } from "../../API/firebase/firebase";
import { useMessage } from "../useMessage";
import { searchTabState } from "../../store/dbreturn";
import firebase from 'firebase/compat/app';

type Props ={
  writer: string;
  userId: string;
  wrotedate: firebase.firestore.Timestamp;
  updateDate: firebase.firestore.Timestamp;
  videoID: string;
  copytime: {
    start:{min:number, sec:number;}
    end:{min:number, sec:number;}
  }
  title: string;
  artist: string;
  good: number;
  tabdata: string;
  comment: string;
}

export const useDbHook = () =>{
  const {showMessage} = useMessage();
  const [loadingStore, setLoadingStore] = useState(false);
  const setTab = useSetRecoilState(searchTabState);

  const createTab = useCallback( async(value: Props)=>{
    setLoadingStore(true);

    if(value){
      try{
        const res = await db.collection("Tab").add(value)
        showMessage({ title: "Tabを新規作成しました", status: "success"}) 
        console.log(res)
      }catch(e){
        showMessage({ title: "Tabの新規作成に失敗しました", status: "error"})
      }finally{
        setLoadingStore(false);
      }
    }

  },[showMessage]);

  const searchTab = useCallback((keyword: string) =>{
    setLoadingStore(true);

    db.collection("Tab").orderBy("title").startAt(keyword).endAt(keyword + '\uf8ff').get().then((QuerySnapshot)=>{
      const docs = QuerySnapshot.docs.map(doc => doc.data());
      setTab(docs)
    }).catch(()=>{
      showMessage({ title: "Tabの検索に失敗しました", status: "warning"})
    }).finally(()=>{
      setLoadingStore(false)
    })
  },[showMessage, setTab])

  

  return {loadingStore ,createTab, searchTab}
};