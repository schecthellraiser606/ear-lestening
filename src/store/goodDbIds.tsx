import { atom } from 'recoil';
import firebase from 'firebase/compat/app';
import { MainTab } from '../Types/tab/TabModal';

type State =  Array<String> | firebase.firestore.DocumentData[]

export const searchGoodAllTabState = atom<State>({
  key: "searchGoodAllTabState",
  default: [],
  // dangerouslyAllowMutability: true,
})