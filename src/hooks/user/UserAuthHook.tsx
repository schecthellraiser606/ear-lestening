import { useCallback, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useResetRecoilState} from "recoil";
import { auth, provider } from "../../API/firebase/firebase";
import { userState } from "../../store/userState";
import { useMessage } from "../useMessage";

export const AuthHook = ()=> {
  const [user, setUser] = useRecoilState(userState)
  const [loading, setLoading] = useState(false);
  const resetStatus = useResetRecoilState(userState);
  const {showMessage} = useMessage();

  const history = useHistory();

  //サインイン
  const useSignIn = useCallback(
     async (email: string, password: string) => {
      setLoading(true);
      try {
          await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        showMessage({ title: "サインイン認証に失敗しました", status: "error"})
      } finally{
        setLoading(false);
        history.push('/');
      }
    },[]);

  //登録
  const useSignUp = useCallback(
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
    },[]);

  //サインアウト
  const useSignOut = useCallback(
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
    },[]);

  const useGoogleAuth = useCallback(
    async()=>{
      setLoading(true);
      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        showMessage({ title: "Googleアカウントでのサインインに失敗しました", status: "error"})
      }finally{
        setLoading(false);
        history.push('/');
      } 
    },[])

  //ユーザ状態の監視
  const useUserAuth = ()=>{
    setLoading(true);
    useEffect(() => {
      const unsubscribed = auth.onAuthStateChanged((user) => {
        if(user){
          setUser(user);
        } else{
          resetStatus();
        }
        setLoading(false); 
      });
      return () => unsubscribed();
    }, [setUser, resetStatus]);
    setLoading(false);

    return user;
  };

  return{ loading, useSignIn, useSignOut, useSignUp, useUserAuth, useGoogleAuth };

};