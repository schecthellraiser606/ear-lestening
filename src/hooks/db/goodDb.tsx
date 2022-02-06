import { useCallback, useState } from "react";
import { db } from "../../API/firebase/firebase";
import { useMessage } from "../useMessage";
import firebase from 'firebase/compat/app';
import { useSetRecoilState } from "recoil";
import { goodUserState } from "../../store/goodState";


export const useGoodDbHook = () =>{
  const {showMessage} = useMessage();
  const [loadingGoodStore, setLoadingGoodStore] = useState(false);
  const setGoodState = useSetRecoilState(goodUserState);

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

  const searchUserId = useCallback( (userId: string | undefined, docId: string)=>{
    setLoadingGoodStore(true);
    let isgoodState = false;

    if(userId && docId){
        db.collection("Tab").doc(docId).collection("Like").doc(docId).get().then((QuerySnapshot)=>{
          const doc = QuerySnapshot.data()
          isgoodState = doc?.Ids.includes(userId);
        }).catch((e)=>{
          showMessage({ title: "「いいね」したTabが見つかりません", status: "info"});
        }).finally(() =>{ 
          setLoadingGoodStore(false)
          setGoodState(isgoodState)
        })
    }else{
      setLoadingGoodStore(false);
      setGoodState(isgoodState)
    }

  }, [showMessage, setGoodState])
  

  return {loadingGoodStore, addGood, removeGood, searchUserId};
};