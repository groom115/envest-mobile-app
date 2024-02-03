import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../global/store";
import AppHeader from "../../../components/AppHeader";
import { WebView, WebViewNavigation } from "react-native-webview";
import { Auth } from "aws-amplify";
import { setProfile } from "../../../global/slices/profile";
import { getKycStartUrl } from "../../../services/kyc.service";

const KycScreen = () => {

  const {userId, name, kycVerified}=useSelector((state: RootState)=>state.profile);
  const [startKycUrl, setStartKycUrl]=useState<string>('');
  const dispatch=useDispatch();

  const handlePressCompleteKyc=async()=>{
    try{
      const urlRes=await getKycStartUrl({
        userName: name ?? '',
        transactionId: `${userId}-kyc`,
        workflowId: 'OCR_Facematch_Text'
      });
      if(urlRes){
        setStartKycUrl(urlRes);
      }
    } catch(error){
      console.error(error);
    }
  }

  const updateUserProfileOnKycCompletion=async()=>{
    try{
      const currentUser=await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(currentUser,{
      'custom:kycVerified':"Y"
    });

    const newUser= await Auth.currentAuthenticatedUser();
    dispatch(
      setProfile({
        email:newUser.attributes["email"],
        emailVerified: newUser.attributes["email_verified"],
        userId: newUser.attributes["sub"],
        name: newUser.attributes["custom:name"],
        kycVerified: newUser.attributes["custom:kycVerified"] == "Y" ? true : false,
        bankVerified: newUser.attributes["custom:bankVerified"] == "Y" ? true : false,
        phone: newUser.attributes["custom:phone"]
    }));
    } catch(error) {
      console.error(error);
    }
  }

  const handleRedirectionToApp = async(event: WebViewNavigation) => {
    if(event.url.includes('https://www.envest.money')){
      const kycStatus=event.url.split('&')[1].split('=')[1];
      switch(kycStatus){
        case "user_cancelled":
          // TODO: Add a Popup/Feedback Component
          break;
        case "error":
          // TODO: Add a Popup/Feedback Component and call Jarvis
          break;
        case "auto_declined":
          // TODO: Add a Popup/Feedback Component
        case "auto_approved":
          await updateUserProfileOnKycCompletion();
          break;
        case "needs_review":
          // TODO: Add a Popup/Feedback Component and call Jarvis
          break;
        default:
          return;
      }
      setStartKycUrl('');
    }
  }

  if(startKycUrl){
    return <WebView 
    source={{ uri: startKycUrl}} 
    onNavigationStateChange={handleRedirectionToApp}
    />
  }

  const title = (title1: string, title2: string) => {
    return (
      <View style={{ marginTop: 28 }}>
        <Text style={styles.title}>
          {title1} <Text style={{ color: "#FFD76F" }}>{title2}</Text>
        </Text>
      </View>
    );
  };
  const steps = () => {
    return (
      <View
        style={{
          backgroundColor: "#343434",
          marginTop: 20,
          padding: 16,
          borderRadius: 5,
          paddingLeft: 20
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", gap: 24 }}>
          <Text style={styles.stepText}>Step 1:</Text>
          <View>
            <Text style={styles.stepText1}>Pan Card Verification</Text>
            <Text style={styles.stepText2}>
              Upload a photo & verify your pan.
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 24,
            marginTop: 28,
          }}
        >
          <Text style={styles.stepText}>Step 2:</Text>
          <View>
            <Text style={styles.stepText1}>Address Proof Verification</Text>
            <Text style={styles.stepText2}>Upload a photo & verify your:</Text>
            <Text style={styles.stepText2}> • Aadhar Card or</Text>
            <Text style={styles.stepText2}> • Driving License.</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 24,
            marginTop: 28,
          }}
        >
          <Text style={styles.stepText}>Step 3:</Text>
          <View>
            <Text style={styles.stepText1}>Liveness Check</Text>
            <Text style={styles.stepText2}>
              Click a selfie and you are set.
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const button = () => {
    return (
      <TouchableOpacity
        style={{ borderRadius: 5, marginTop: 20, backgroundColor: "#FFD76F" }}
        onPress={handlePressCompleteKyc}
      >
        <Text style={styles.butText}>Complete your KYC</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <AppHeader showLogo />
      {title(kycVerified?"You are a KYC":"Complete KYC in", kycVerified?" Verified Envestor!":" 120 seconds!")}
      {steps()}
      {!kycVerified && button()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingHorizontal: 16,
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    marginTop: 58,

    justifyContent: "space-between",
  },
  help: {
    color: "#FFF3D3",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
  },
  title: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 25,
  },
  stepText: {
    color: "#FFD76F",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 20,
  },
  stepText1: {
    color: "white",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 20,
    marginBottom:4
  },
  stepText2: {
    color: "#979797",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
  },
  butText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 12,
    textAlign: "center",
  },
  welcome: {
    color: "#FFD76F",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 24,
  },
});

export default KycScreen;
