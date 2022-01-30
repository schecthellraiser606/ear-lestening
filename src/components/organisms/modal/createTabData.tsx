import { Divider, FormControl, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea } from "@chakra-ui/react";
import {ChangeEvent, memo, useEffect, useState, VFC} from "react";
import { MainTab } from "../../../Types/tab/TabModal";
import { PrimaryButton } from "../../atoms/buttons/PrimaryButtom";
import { VexTabComponent } from "../../molecules/Tab/VextabComponent";


import firebase from 'firebase/compat/app';
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/userState";
import {videoState} from "../../../store/videoState"
import { useDbHook } from "../../../hooks/db/dbhooks";

type Props = {
  maindata: MainTab | null | firebase.firestore.DocumentData ;
  isOpen: boolean;
  onClose: () => void;
}

let today1 = new Date();

export const CreateTabData: VFC<Props> = memo( (props)=> {
  const today1 = new Date();

  const user = useRecoilValue(userState)
  const videoInfo = useRecoilValue(videoState)

  const {maindata, isOpen, onClose} = props;

  const { createTab, loadingStore } = useDbHook(); 

  const [writerName, setWriterName] = useState('');
  const [wroteDate, setWroteDate] = useState(today1);
  const [updateDate, setUpdateDate] = useState(today1);

  const [startmin, setStartMin] = useState(0);
  const [startsec, setStartSec] = useState(0);
  const [endmin, setEndMin] = useState(5);
  const [endsec, setEndSec] = useState(10);

  const [title, setTitle] = useState(''); 
  const [artist, setArtist] = useState('');
  
  const [tabData, setTabData] = useState(''); 
  const [comment, setComment] = useState('');

  useEffect(() => {
    setWriterName(user?.displayName?? '');
    setWroteDate(maindata?.wrotedate ?? today1);
    setUpdateDate(maindata?.updateDate ?? today1);
    setStartMin(maindata?.copytime.start.min ?? 0);
    setStartSec(maindata?.copytime.start.sec ?? 0);
    setEndMin(maindata?.copytime.end.min ?? 0);
    setEndSec(maindata?.copytime.end.sec ?? 0);
    setTitle('');
    setArtist('');
    setTabData(maindata?.tabdata ?? '');
    setComment(maindata?.comment ?? '');
    
  }, [maindata, user?.displayName])

  const onChangeWriterName = (e: ChangeEvent<HTMLInputElement>) => setWriterName(e.target.value);

  const onChangeStartMin = (e: ChangeEvent<HTMLInputElement>) => setStartMin(e.target.valueAsNumber);
  const onChangeStartSec = (e: ChangeEvent<HTMLInputElement>) => setStartSec(e.target.valueAsNumber);
  const onChangeEndMin = (e: ChangeEvent<HTMLInputElement>) => setEndMin(e.target.valueAsNumber);
  const onChangeEndSec = (e: ChangeEvent<HTMLInputElement>) => setEndSec(e.target.valueAsNumber);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeArtist = (e: ChangeEvent<HTMLInputElement>) => setArtist(e.target.value);

  const onChangeTabData = (e: ChangeEvent<HTMLTextAreaElement>) => setTabData(e.target.value);

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);

  const photoURL = "https://source.unsplash.com/2LowviVHZ-E";

  const onClickCreate = () => {
    const value = {
      writer: writerName,
      userId: user?.uid ?? '',
      wrotedate: firebase.firestore.Timestamp.now(),
      updateDate: firebase.firestore.Timestamp.now(),
      videoID: videoInfo.videoId[0],
      copytime: {
        start:{min:startmin, sec:startsec,},
        end:{min:endmin, sec:endsec,},
      },
      title: title,
      artist: artist,
      good: 0,
      tabdata: tabData,
      comment: comment,
    }
    createTab(value);
    onClose();
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
     <Input value={writerName} onChange={onChangeWriterName}/>
     <FormControl>作成日時</FormControl>
     <Input value={wroteDate.toDateString()} isReadOnly/>
     <FormControl>更新日時</FormControl>
     <Input value={updateDate.toDateString()} isReadOnly/>
     
     <FormControl>コピー秒数</FormControl>
     <HStack>
     <Input value={startmin} onChange={onChangeStartMin} />
     <Text>:</Text>
     <Input value={startsec} onChange={onChangeStartSec} />
     <Text>〜</Text>
     <Input value={endmin} onChange={onChangeEndMin}/>
     <Text>:</Text>
     <Input value={endsec} onChange={onChangeEndSec}/>
     </HStack>
     
     <FormControl>曲名</FormControl>
     <Input value={title} onChange={onChangeTitle} />
     <FormControl>アーティスト名</FormControl>
     <Input value={artist} onChange={onChangeArtist}/>
     <FormControl>Tab</FormControl>
     <VexTabComponent isEditor={true} data={tabData} onChange={onChangeTabData} />
     <FormControl>詳細説明</FormControl>
     <Textarea value={comment} onChange={onChangeComment} />

     <Divider my={4}/>
    
     </Stack>
     </ModalBody>


      <ModalFooter>
        <PrimaryButton onClick={onClickCreate} loading={loadingStore}>新規作成</PrimaryButton>
      </ModalFooter>

     </ModalContent>

    </Modal>
  );
});