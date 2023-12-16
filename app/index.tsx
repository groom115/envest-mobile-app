import React, { useEffect, useState } from 'react';
import {Redirect, useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth, Hub } from 'aws-amplify';
import { removeAuth, setAuth } from '../global/slices/auth';
import { removeProfile, setProfile } from '../global/slices/profile';

const Home = () => {

  const router=useRouter();

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

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data }}) => {
      switch (event) {
        case "signIn":
          // setAuth({})
          console.log(data);
          router.replace("/home");
          break;
        case "signOut":
          removeAuth();
          removeProfile();
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
      // setProfile({})
    } catch(error) {
      console.error(error);
      console.log("Not signed in");
    }
  };

    if(!ifUserOnboarded){
        return <Redirect href="/onboarding"/>
    }

    return <Redirect href="/register"/>
}

export default Home
