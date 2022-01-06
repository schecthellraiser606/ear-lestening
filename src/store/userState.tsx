import { atom } from 'recoil';
import firebase from 'firebase/compat/app';

type State = firebase.User | null;

export const userState = atom<State>({
  key: 'authState',
  default: null,
  // dangerouslyAllowMutability: true,
});