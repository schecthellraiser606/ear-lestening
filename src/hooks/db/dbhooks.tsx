import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { db } from "../../API/firebase/firebase";
import { useMessage } from "../useMessage";
import { searchTabStateArtist } from "../../store/dbreturn01";
import { searchTabStateTitle } from "../../store/dbReturn02";
import firebase from 'firebase/compat/app';
import { searchUserAllTabState } from "../../store/dbUserTab";

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
  const setTabArtist = useSetRecoilState(searchTabStateArtist);
  const setTabTitle = useSetRecoilState(searchTabStateTitle);
  const setUserAllTabSte = useSetRecoilState(searchUserAllTabState);

  const createTab = useCallback( async(value: Props)=>{
    setLoadingStore(true);

    if(value){
      try{
        const res = await db.collection("Tab").add(value);
        showMessage({ title: "Tabを新規作成しました", status: "success"}); 
      }catch(e){
        showMessage({ title: "Tabの新規作成に失敗しました", status: "error"});
      }finally{
        setLoadingStore(false);
      }
    }else{
      showMessage({ title: "入力値にエラーがあります。", status: "error"});
    }

  },[showMessage]);

  const searchTab = useCallback((keyword: string) =>{
    setLoadingStore(true);

    db.collection("Tab").orderBy("title").startAt(keyword).endAt(keyword + '\uf8ff').get().then((QuerySnapshot)=>{
      const docs = QuerySnapshot.docs.map(doc => doc.data());
      setTabTitle(docs)
    }).catch(()=>{
      showMessage({ title: "Tabの検索に失敗しました", status: "warning"});
    })

    db.collection("Tab").orderBy("artist").startAt(keyword).endAt(keyword + '\uf8ff').get().then((QuerySnapshot)=>{
      const docs = QuerySnapshot.docs.map(doc => doc.data());
      setTabArtist(docs)
    }).catch(()=>{
      showMessage({ title: "Tabの検索に失敗しました", status: "warning"});
    }).finally(()=>{
      setLoadingStore(false);
    })
    
  },[showMessage, setTabArtist, setTabTitle]);

  const searchUserTab = useCallback((writer: string | undefined) =>{
    setLoadingStore(true);

    if(writer){
      db.collection("Tab").orderBy("writer").startAt(writer).endAt(writer).get().then((QuerySnapshot)=>{
        const docs = QuerySnapshot.docs.map(doc => doc.data());
        setUserAllTabSte(docs)
      }).catch(()=>{
        showMessage({ title: "Tabの検索に失敗しました", status: "warning"});
      }).finally(()=>{
        setLoadingStore(false);
      })
    }else{
      showMessage({ title: "ログインしてください", status: "error"}); 
      setLoadingStore(false); 
    }

  },[showMessage, setUserAllTabSte]);


  const updateDb = useCallback( async(id: string, value: Props)=>{
    setLoadingStore(true);
    if(value && id){
      try{
        await db.collection("Tab").doc(id).update({
          writer: value.writer,
          updateDate: value.updateDate,
          copytime: value.copytime,
          title: value.title,
          artist: value.artist,
          tabdata: value.tabdata,
          comment: value.comment,
        });
        showMessage({ title: "Tabを更新しました", status: "success"});  
      }catch(e){
        showMessage({ title: "Tabの更新に失敗しました", status: "error"});
      }finally{
        setLoadingStore(false);
      }
    }else{
      showMessage({ title: "入力値にエラーがあります", status: "error"}); 
      setLoadingStore(false);
    }
  },[showMessage]);


  const deleteDb = useCallback(async(id: string) =>{
    setLoadingStore(true);
    if(id){
      try{
        await db.collection("Tab").doc(id).delete();
        showMessage({ title: "Tabを削除しました", status: "success"}); 
      }catch(e){
        showMessage({ title: "Tabの削除に失敗しました", status: "error"});
      }finally{
        setLoadingStore(false);
      }
    }else{
      showMessage({ title: "Tabが存在しません、エラーがあります", status: "error"}); 
      setLoadingStore(false); 
    }
  }, [showMessage])

  

  return {loadingStore ,createTab, searchTab, updateDb, deleteDb, searchUserTab}
};