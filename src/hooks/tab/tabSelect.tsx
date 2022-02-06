import { useCallback, useState } from "react";
import { MainTab } from "../../Types/tab/TabModal";
import firebase from 'firebase/compat/app';
import { useGoodDbHook } from "../db/goodDb";
import { userState } from "../../store/userState";
import { useRecoilValue } from "recoil";

type Props = {
  id: number;
  tabs: Array<MainTab> | firebase.firestore.DocumentData[];
  onOpen: ()=>void;
}

//ユーザ選択後にモーダル表示
export const useSelectTab = () => {
  const {loadingGoodStore, searchUserId} = useGoodDbHook();
  const [selectedTab, setSelectedTab] = useState<MainTab | null | firebase.firestore.DocumentData >(null);
  const SigninUser = useRecoilValue(userState);

  const onSelectTab = useCallback(
    (props: Props) => {
      const {id, tabs, onOpen} = props;
      const targetTab = tabs.find((tab) => tab.id===id);
      setSelectedTab(targetTab ?? null);
      
      try{
        searchUserId(SigninUser?.uid, targetTab?.id)
      }finally{onOpen();}
    },
    [SigninUser?.uid, searchUserId],
  );

  return { onSelectTab, selectedTab, loadingGoodStore}
};