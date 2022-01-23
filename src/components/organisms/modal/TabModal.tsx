import { Divider, FormControl, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import {ChangeEvent, memo, useEffect, useState, VFC} from "react";
import { useMessage } from "../../../hooks/useMessage";
import { MainTab } from "../../../Types/tab/TabModal";
import { PrimaryButton } from "../../atoms/buttons/PrimaryButtom";
import { VexTabComponent } from "../../molecules/Tab/VextabComponent";


import { GoodComponent } from "../../molecules/good";

type Props = {
  maindata: MainTab | null;
  isOpen: boolean;
  isEditor?: boolean;
  onClose: () => void;
}

let today1 = new Date();

export const TabModal: VFC<Props> = memo( (props)=> {
  const {maindata, isOpen, isEditor = false, onClose} = props;
  const { showMessage } = useMessage();

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
    
  }, [maindata])

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

  const photoURL = "https://source.unsplash.com/2LowviVHZ-E";

  const onClickUpdate = () => showMessage({ title: "更新しました", status: "success"});;
  const onClickgood = () =>showMessage({ title: "Goodしたよ", status: "success"});;

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
     <Input value={wroteDate.toDateString()} isReadOnly/>
     <FormControl>更新日時</FormControl>
     <Input value={updateDate.toDateString()} onChange={onChangeUpdateDate} isReadOnly/>
     
     <FormControl>コピー日時</FormControl>
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
     <VexTabComponent editor= {isEditor ? "true" : "false"} data={maindata?.tabdata}/>

     <Divider my={4}/>
     <GoodComponent good={good} onClick={onClickgood}/>
     <Divider my={4}/>
    
     </Stack>
     </ModalBody>

     {isEditor && (
      <ModalFooter>
        <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
      </ModalFooter>
      ) }

     </ModalContent>

    </Modal>
  );
});