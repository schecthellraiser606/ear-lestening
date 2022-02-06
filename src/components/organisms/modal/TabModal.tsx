import { Divider, FormControl, Grid, GridItem, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Text, Textarea } from "@chakra-ui/react";
import {ChangeEvent, memo, useEffect, useRef, useState, VFC} from "react";
import { MainTab } from "../../../Types/tab/TabModal";
import { PrimaryButton } from "../../atoms/buttons/PrimaryButtom";
import { VexTabComponent } from "../../molecules/Tab/VextabComponent";
import {useDbHook } from "../../../hooks/db/dbhooks"


import { GoodComponent } from "../../molecules/good";
import firebase from 'firebase/compat/app';
import { AlertDialogComp } from "../../molecules/AlertDialog";
import { useRecoilState, useRecoilValue } from "recoil";

import { userState } from "../../../store/userState";
import { useGoodDbHook } from "../../../hooks/db/goodDb";
import { useMessage } from "../../../hooks/useMessage";
import { goodUserState } from "../../../store/goodState";

type Props = {
  maindata: MainTab | null | firebase.firestore.DocumentData ;
  isOpen: boolean;
  isEditor?: boolean;
  onClose: () => void;
}

let today1 = firebase.firestore.Timestamp.now()

export const TabModal: VFC<Props> = memo( (props)=> {
  const {maindata, isOpen, isEditor = false, onClose} = props;
  const { loadingStore, updateDb, deleteDb } = useDbHook();
  const {addGood, removeGood, loadingGoodStore} = useGoodDbHook();
  const {showMessage} = useMessage();

  const SigninUser = useRecoilValue(userState);
  const [isgoodState, setIsGoodState] = useRecoilState(goodUserState);

  const [writerName, setWriterName] = useState('');
  const [wroteDate, setWroteDate] = useState(today1);
  const [updateDate, setUpdateDate] = useState(today1);

  const [startmin, setStartMin] = useState(0);
  const [startsec, setStartSec] = useState(0);
  const [endmin, setEndMin] = useState(5);
  const [endsec, setEndSec] = useState(10);

  const [title, setTitle] = useState(''); 
  const [artist, setArtist] = useState(''); 
  const [good, setGood] = useState(0);
  
  const [tabData, setTabData] = useState('');
  const [comment, setComment] = useState('');

  const [alertOpen, setAlertOpen] = useState(false);
  const alertClose = ()=>setAlertOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteHook = ()=>{
    deleteDb(maindata?.id);
    alertClose();
  };


  useEffect(() => {
    setWriterName(maindata?.writer ?? '');
    setWroteDate(maindata?.wrotedate ?? today1);
    setUpdateDate(maindata?.updateDate ?? today1);
    setStartMin(maindata?.copytime.start.min ?? 0);
    setStartSec(maindata?.copytime.start.sec ?? 0);
    setEndMin(maindata?.copytime.end.min ?? 0);
    setEndSec(maindata?.copytime.end.sec ?? 0);
    setTitle(maindata?.title ?? '');
    setArtist(maindata?.artist ?? '');
    setGood(maindata?.good ?? 0);
    setTabData(maindata?.tabdata ?? '');
    setComment(maindata?.comment ?? '');
    
  }, [maindata, SigninUser?.uid])

  const onChangeWriterName = (e: ChangeEvent<HTMLInputElement>) => setWriterName(e.target.value);
  const onChangeUpdateDate = () =>{
    setUpdateDate(today1);
  }
  const onChangeStartMin = (e: ChangeEvent<HTMLInputElement>) => setStartMin(e.target.valueAsNumber);
  const onChangeStartSec = (e: ChangeEvent<HTMLInputElement>) => setStartSec(e.target.valueAsNumber);
  const onChangeEndMin = (e: ChangeEvent<HTMLInputElement>) => setEndMin(e.target.valueAsNumber);
  const onChangeEndSec = (e: ChangeEvent<HTMLInputElement>) => setEndSec(e.target.valueAsNumber);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeArtist = (e: ChangeEvent<HTMLInputElement>) => setArtist(e.target.value);

  const onChangeTabData = (e: ChangeEvent<HTMLTextAreaElement>) => setTabData(e.target.value);
  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);

  const photoURL = "https://source.unsplash.com/2LowviVHZ-E";

  const onClickUpdate = () => {
    const value ={
      id: maindata?.id,
      writer: writerName,
      userId: maindata?.userId ?? '',
      wrotedate: maindata?.wrotedate,
      updateDate: today1,
      videoID: maindata?.videoID,
      copytime: {
        start:{min:startmin, sec:startsec,},
        end:{min:endmin, sec:endsec,},
      },
      title: title,
      artist: artist,
      good: good,
      tabdata: tabData,
      comment: comment,
    }

    updateDb(maindata?.id , value);
  };

  const onClickDelete = ()=>deleteDb(maindata?.id);


  const onClickgood = () =>{
    try{
      if(isgoodState){
        removeGood(maindata?.id, SigninUser?.uid);
        setGood(good-1);
      }else{
        addGood(maindata?.id, SigninUser?.uid);
        setGood(good+1);
      }
      setIsGoodState(!isgoodState);
    }catch(e){
      showMessage({ title: "現在「いいね」できません", status: "error"});
    }
  }


  return(
    <Modal 
    isOpen={isOpen} 
    onClose={onClose} 
    autoFocus={false}
    size="xl"
    motionPreset="slideInBottom"
     >
     <ModalOverlay />
     <ModalContent pb={8}>
     <ModalHeader boxSize="xl">Tab♪</ModalHeader>
     <ModalCloseButton />
     <ModalBody mx={2}>
     <Stack spacing={4}>

     <Image 
        boxSize="200px" 
        borderRadius="full"
        m="auto"
        src={photoURL ?? undefined}/>

     <FormControl>作成者</FormControl>
     <Input value={writerName} onChange={onChangeWriterName} isReadOnly={!isEditor} />
     <FormControl>作成日時</FormControl>
     <Input value={wroteDate.toDate().toLocaleDateString()} isReadOnly/>
     <FormControl>更新日時</FormControl>
     <Input value={updateDate.toDate().toLocaleDateString()} onChange={onChangeUpdateDate} isReadOnly/>
     
     <FormControl>コピー秒数</FormControl>
     <HStack>
     <Input value={startmin} onChange={onChangeStartMin} isReadOnly={!isEditor} />
     <Text>:</Text>
     <Input value={startsec} onChange={onChangeStartSec} isReadOnly={!isEditor} />
     <Text>〜</Text>
     <Input value={endmin} onChange={onChangeEndMin} isReadOnly={!isEditor} />
     <Text>:</Text>
     <Input value={endsec} onChange={onChangeEndSec} isReadOnly={!isEditor} />
     </HStack>
     
     <FormControl>曲名</FormControl>
     <Input value={title} onChange={onChangeTitle} isReadOnly={!isEditor} />
     <FormControl>アーティスト名</FormControl>
     <Input value={artist} onChange={onChangeArtist} isReadOnly={!isEditor} />
     <FormControl>Tab</FormControl>
     <VexTabComponent isEditor= {isEditor} data={tabData} onChange={onChangeTabData}/>
     <FormControl>詳細説明</FormControl>
     <Textarea value={comment} onChange={onChangeComment}  />

     <Divider my={4}/>
     <Grid templateColumns='repeat(5, 1fr)' gap={3}>
       <GridItem colSpan={3}>
        < GoodComponent good={good} onClick={onClickgood} disable={ (SigninUser?.uid && !loadingGoodStore) ?  false : true} status={isgoodState}/>
      </GridItem>
     </Grid>
     <Divider my={4}/>
    
     </Stack>
     </ModalBody>

     {isEditor && (
      <ModalFooter>
        <Stack>
        <PrimaryButton onClick={onClickUpdate} disable={loadingStore}>更新</PrimaryButton>
        <Spacer/>

        <PrimaryButton onClick={onClickDelete} disable={loadingStore}>削除</PrimaryButton>
        <AlertDialogComp isOpen={alertOpen} onClose={alertClose} cancelRef={cancelRef} deleteHook={deleteHook}/>
        </Stack>
      </ModalFooter>
      ) }

     </ModalContent>

    </Modal>
  );
});