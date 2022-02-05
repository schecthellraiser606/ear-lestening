import { atom } from 'recoil';
import firebase from 'firebase/compat/app';

type State =  Array<String> | firebase.firestore.DocumentData[]

export const searchGoodAllTabState = atom<State>({
  key: "searchGoodAllTabState",
  default: [],
  // dangerouslyAllowMutability: true,
})