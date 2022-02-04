import { useCallback, useState } from "react";
import { db } from "../../API/firebase/firebase";
import { useMessage } from "../useMessage";
import firebase from 'firebase/compat/app';


export const useGoodDbHook = () =>{
  const {showMessage} = useMessage();
  const [loadingGoodStore, setLoadingGoodStore] = useState(false);

  const addGood = useCallback( async(docId: string, userId: string)=>{
    setLoadingGoodStore(true);

    if(docId){
      try{
        await db.collection("Tab").doc(docId).collection("Like").doc(docId).update({
          id: firebase.firestore.FieldValue.arrayUnion(userId)
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
    }

  },[showMessage]);


  const removeGood = useCallback( async(docId: string, userId: string)=>{
    setLoadingGoodStore(true);

    if(docId){
      try{
        await db.collection("Tab").doc(docId).collection("Like").doc(docId).update({
          id: firebase.firestore.FieldValue.arrayRemove(userId)
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
    }

  },[showMessage]);
  

  return {loadingGoodStore, addGood, removeGood};
};