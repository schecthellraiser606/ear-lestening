import { atom } from 'recoil';
import firebase from 'firebase/compat/app';
import { MainTab } from '../Types/tab/TabModal';

type State =  Array<MainTab> | firebase.firestore.DocumentData[]

export const searchTabState = atom<State>({
  key: "searchTabState",
  default: [],
  // dangerouslyAllowMutability: true,
})