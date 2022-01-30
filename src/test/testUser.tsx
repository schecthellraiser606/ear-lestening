import {MainTab} from "../Types/tab/TabModal"

const today2 = new Date();
const today1 = new Date();

export const UserModel01: MainTab={
    id: "001",
    writer: "テスト１",
    userId: "1",
    wrotedate: today1,
    updateDate: today2,
    videoID: "HgzGwKwLmgM",
    copytime: {
      start:{min:0, sec:10,},
      end:{min:1, sec:20,},
    },
    title: "Don't Stop Me Now",
    artist: "Queen",
    good: 1,
    tabdata: "tabstave\nnotes (8/2.7b9b7/3) (5b6/2.5b6/3) 7/4 |\nnotes (5/2.6/3.7/4)\n\ntabstave\nnotes (5/4.5/5)s(7/4.7/5)s(5/4.5/5) (5/4.5/5)h(7/5) |\nnotes t(12/5.12/4)s(5/5.5/4) 3b4/5 5V/6",
    comment: "test01",
  }

 export const UserModel02: MainTab={
   id: "002",
    writer: "テスト２",
    userId: "2",
    wrotedate: today1,
    updateDate: today2,
    videoID: "17sD6U9HqFg",
    copytime: {
      start:{min:1, sec:20,},
      end:{min:20, sec:30,},
    },
    title: "Bohemian Rhapsody",
    artist: "Queen",
    good: 0,
    tabdata: "tabstave\nnotes (5/4.5/5)s(7/4.7/5)s(5/4.5/5) (5/4.5/5)h(7/5) |\nnotes t(12/5.12/4)s(5/5.5/4) 3b4/5 5V/6",
    comment: "test02",
  }