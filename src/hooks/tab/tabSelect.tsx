import { useCallback, useState } from "react";
import { MainTab } from "../../Types/tab/TabModal";
import firebase from 'firebase/compat/app';

type Props = {
  id: number;
  tabs: Array<MainTab> | firebase.firestore.DocumentData[];
  onOpen: ()=>void;
}

//ユーザ選択後にモーダル表示
export const useSelectTab = () => {
  const [selectedTab, setSelectedTab] = useState<MainTab | null | firebase.firestore.DocumentData >(null);

  const onSelectTab = useCallback(
    (props: Props) => {
      const {id, tabs, onOpen} = props;
      const targetTab = tabs.find((tab) => tab.id===id);
      setSelectedTab(targetTab ?? null);
      onOpen();
    },
    [],
  );

  return { onSelectTab, selectedTab }
};