import React, { useEffect } from 'react';
import {Redirect, useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../global/store';
import { Auth, Hub } from 'aws-amplify';
import { removeAuth, setAuth } from '../global/slices/auth';
import { removeProfile, setProfile } from '../global/slices/profile';

const Main = () => {

  const isAuthenticated=useSelector((state: RootState)=> state.auth.isValid);

  const router=useRouter();
  const dispatch=useDispatch();

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data }}) => {
      switch (event) {
        case "signIn":
          // setAuth({})
          router.replace("/home");
          break;
        case "signOut":
          dispatch(removeAuth());
          dispatch(removeProfile());
          router.replace("/register");
          break;
      }
    });

    getUser();

    return unsubscribe;
  }, []);

  const getUser = async (): Promise<void> => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      dispatch(
        setAuth({
          accessToken: currentUser.signInUserSession.accessToken.jwtToken,
          refreshToken: currentUser.signInUserSession.refreshToken.jwtToken,
          idToken: currentUser.signInUserSession.idToken.jwtToken,
          isValid: true
      }));
      dispatch(
        setProfile({
          email:currentUser.attributes["email"],
          emailVerified: currentUser.attributes["email_verified"],
          userId: currentUser.attributes["sub"],
          name: currentUser.attributes["custom:name"],
          kycVerified: currentUser.attributes["custom:kycVerified"],
          bavVerified: currentUser.attributes["custom:bavVerified"],
          phone: currentUser.attributes["custom:phone"]
      }));
    } catch(error) {
      console.error(error);
      console.log("Not signed in");
    }
  };

    const checkUserOnboarding = async () => {
      try{
        const userOnboarding = await AsyncStorage.getItem('user-onboarding');
        return userOnboarding;
      } catch(err){
        console.error(err);
      }
    }

    let ifUserOnboarded=true

    checkUserOnboarding().then((userOnboarded) => {
      if(userOnboarded!=='true'){
        ifUserOnboarded=false
      }
    })

    if(!ifUserOnboarded){
        return <Redirect href="/onboarding"/>
    }

    if(isAuthenticated){
      return <Redirect href="/funds" />
    }

    return <Redirect href="/register"/>
}

export default Main
