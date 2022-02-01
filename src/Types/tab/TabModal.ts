import firebase from 'firebase/compat/app';

export type MainTab ={
  id: string;
  writer: string;
  userId: string;
  wrotedate: firebase.firestore.Timestamp;
  updateDate: firebase.firestore.Timestamp;
  videoID: string;
  copytime: {
    start:{min:number, sec:number;}
    end:{min:number, sec:number;}
  }
  title: string;
  artist: string;
  good: number;
  tabdata: string;
  comment: string;
}