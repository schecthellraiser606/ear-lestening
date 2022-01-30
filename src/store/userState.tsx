import { atom } from 'recoil';
import firebase from 'firebase/compat/app';

type State = firebase.User | null;

export const userState = atom<State>({
  key: "userState",
  default: null,
  // dangerouslyAllowMutability: true,
})