import React, { useEffect } from 'react';
import {Redirect} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
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
}

export default Home
