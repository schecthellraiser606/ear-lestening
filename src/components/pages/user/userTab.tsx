import { Heading, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import {memo, useCallback, VFC} from "react";
import { useRecoilValue } from "recoil";
import { useSelectTab } from "../../../hooks/tab/tabSelect";
import { searchUserAllTabState } from "../../../store/dbUserTab";
import { userState } from "../../../store/userState";
import { TabCard } from "../../organisms/card/TabCard";
import { TabModal } from "../../organisms/modal/TabModal";

export const UserAllTabComponent: VFC = memo( ()=> {
  const photoURL = "https://source.unsplash.com/2LowviVHZ-E";

  const user = useRecoilValue(userState);
  const tabs = useRecoilValue(searchUserAllTabState); 

  const {isOpen, onOpen, onClose} = useDisclosure();

  const {onSelectTab, selectedTab} = useSelectTab();

  const onClick = useCallback((id: number) => {
    onSelectTab({id, tabs, onOpen})
  }, [tabs, onSelectTab, onOpen]);

  return(
    <>
    <Heading as="h1" size="lg" m={4}>
      Tab一覧
    </Heading>

    <Wrap p={{base: 4, md: 10}} justify="space-around">
    {tabs.map((tab, index)=>(
        <WrapItem key={tab.id} mx="auto">
          <TabCard
            id={tab.id}
            imageUrl={photoURL}
            writer={tab.writer}
            title={tab.title}
            artist={tab.artist}
            good={tab.good}
            onClick={onClick} 
            />
        </WrapItem>
      ))}
    </Wrap>

    <TabModal maindata={selectedTab} isOpen={isOpen} onClose={onClose} isEditor={user?.uid === selectedTab?.userId ? true : false}/>
  </>
  );
});