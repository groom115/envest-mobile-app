import React, { useEffect, useState } from 'react';
import {Redirect, useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth, Hub } from 'aws-amplify';

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

  //TODO: Retrieve User from Redux
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data }}) => {
      switch (event) {
        case "signIn":
          router.replace("/home");
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
      }
    });

    getUser();

    return unsubscribe;
  }, []);

  const getUser = async (): Promise<void> => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
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
