import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { useCallback, useState} from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState} from "recoil";
import { auth, provider } from "../../API/firebase/firebase";
import { userState } from "../../store/userState";
import { useMessage } from "../useMessage";

export const useAuthHook = ()=> {
  const setUser= useSetRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const {showMessage} = useMessage();

  const history = useHistory();

  //サインイン
  const userSignIn = useCallback(
     async (email: string, password: string) => {
      setLoading(true);
      try {
        const authUser = await auth.signInWithEmailAndPassword(email, password);
          if(authUser.user){setUser(authUser.user);}
      } catch (error) {
        showMessage({ title: "サインイン認証に失敗しました", status: "error"})
      } finally{
        setLoading(false);
      }
    },[showMessage, setUser]);

  //登録
  const userSignUp = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
          await auth.createUserWithEmailAndPassword(email, password);
      } catch (error) {
        showMessage({ title: "ユーザ登録に失敗しました", status: "error"})
      }finally{
        setLoading(false);
        history.push('/');
      }
    },[history, showMessage]);

  //サインアウト
  const userSignOut = useCallback(
    async () => {
      setLoading(true);
      try {
          await auth.signOut();
      } catch (error) {
        showMessage({ title: "サインアウトに失敗しました", status: "error"})
      }finally{
        setLoading(false);
        history.push('/');
      }
    },[history, showMessage]);

  const userGoogleAuth = useCallback(
    async()=>{
      setLoading(true);
      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        showMessage({ title: "Googleアカウントでのサインインに失敗しました", status: "error"})
      }finally{
        setLoading(false);
      } 
    },[showMessage])


  const userUpdateName = useCallback(
    async(name: string) => {
      setLoading(true);
      const authuser = getAuth();
      if(authuser.currentUser && name){
        updateProfile(authuser.currentUser, {
          displayName: name
        })
        .then(()=>showMessage({ title: "変更完了", status: "info"}))
        .catch((error)=>showMessage({ title: "変更できませんでした", status: "error"}))
        .finally(()=>{setLoading(false)})
      }else{
        showMessage({ title: "変更できませんでした。", status: "error"})
        history.push('/');
      }
    },
    [history, showMessage],);


    const userUpdateEmail = useCallback(
      async(email: string) => {
        setLoading(true);
        const authuser = getAuth();
        if(authuser.currentUser && email){
          updateEmail(authuser.currentUser, email)
          .then(()=>showMessage({ title: "変更完了", status: "info"}))
          .catch((error)=>showMessage({ title: "変更できませんでした", status: "error"}))
          .finally(()=>{setLoading(false)})
        }else{
          showMessage({ title: "変更できませんでした。", status: "error"});
          history.push('/');
        }
      },
      [history, showMessage],);


  return{ loading, userSignIn, userSignOut, userSignUp, userGoogleAuth, userUpdateName, userUpdateEmail };

};