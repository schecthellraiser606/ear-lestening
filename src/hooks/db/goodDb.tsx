import { useCallback, useState } from "react";
import { db } from "../../API/firebase/firebase";
import { useMessage } from "../useMessage";
import firebase from 'firebase/compat/app';
import { useSetRecoilState } from "recoil";
import { searchGoodAllTabState } from "../../store/goodDbIds";


export const useGoodDbHook = () =>{
  const {showMessage} = useMessage();
  const [loadingGoodStore, setLoadingGoodStore] = useState(false);
  const setGoodState = useSetRecoilState(searchGoodAllTabState);

  const addGood = useCallback( async(docId: string, userId: string | undefined)=>{
    setLoadingGoodStore(true);

    if(docId && userId){
      try{
        await db.collection("Tab").doc(docId).collection("Like").doc(docId).update({
          Ids: firebase.firestore.FieldValue.arrayUnion(userId)
        })
        await db.collection("Tab").doc(docId).update({
          good: firebase.firestore.FieldValue.increment(1)
        })
        showMessage({ title: "「いいね」しました", status: "success"}); 
      }catch(e){
        showMessage({ title: "「いいね」に失敗しました", status: "error"});
      }finally{
        setLoadingGoodStore(false);
      }
    }else{
      showMessage({ title: "入力値にエラーがあります。", status: "error"});
      setLoadingGoodStore(false);
    }

  },[showMessage]);


  const removeGood = useCallback( async(docId: string, userId: string | undefined)=>{
    setLoadingGoodStore(true);

    if(docId && userId){
      try{
        await db.collection("Tab").doc(docId).collection("Like").doc(docId).update({
          Ids: firebase.firestore.FieldValue.arrayRemove(userId)
        })
        await db.collection("Tab").doc(docId).update({
          good: firebase.firestore.FieldValue.increment(-1)
        })
        showMessage({ title: "「いいね」を解除しました", status: "success"}); 
      }catch(e){
        showMessage({ title: "「いいね」を解除できませんでした", status: "error"});
      }finally{
        setLoadingGoodStore(false);
      }
    }else{
      showMessage({ title: "入力値にエラーがあります。", status: "error"});
      setLoadingGoodStore(false);
    }

  },[showMessage]);

  const searchUserId = useCallback(async(userId: string | undefined)=>{
    setLoadingGoodStore(true);

    if(userId){
      try{
        await db.collectionGroup("Like").where("Ids", "array-contains", userId).get().then((QuerySnapshot)=>{
          const docs = QuerySnapshot.docs.map(doc => doc.id);
          setGoodState(docs);
        })
      }catch(e){
        showMessage({ title: "「いいね」されているTabを取得できませんでした", status: "info"});
      }finally{
        setLoadingGoodStore(false);
      }
    }else{
      setLoadingGoodStore(false);
    }

  }, [showMessage, setGoodState])
  

  return {loadingGoodStore, addGood, removeGood, searchUserId};
};