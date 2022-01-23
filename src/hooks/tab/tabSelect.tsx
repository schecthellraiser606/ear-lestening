import { useCallback, useState } from "react";
import { MainTab } from "../../Types/tab/TabModal";

type Props = {
  id: number;
  tabs: Array<MainTab>;
  onOpen: ()=>void;
}

//ユーザ選択後にモーダル表示
export const useSelectTab = () => {
  const [selectedTab, setSelectedTab] = useState<MainTab | null>(null);

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