import { atom } from 'recoil';

type State =  boolean

export const goodUserState = atom<State>({
  key: "goodUserState",
  default: false,
  // dangerouslyAllowMutability: true,
})