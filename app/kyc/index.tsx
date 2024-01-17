import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import images from "../../constants/images";
import { useRouter } from "expo-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../global/store";
// import { WebView } from 'react-native-webview';

const KycScreen = () => {

  const {userId, name}=useSelector((state: RootState)=>state.profile);

  const [startKycUrl, setStartKycUrl]=useState<string>('');

  const handlePressCompleteKyc=async()=>{
    const startKycResponse=await axios.post('https://ind.idv.hyperverge.co/v1/link-kyc/start',{
        workflowId: "OCR_Facematch_Text",
        redirectUrl: "https://www.envest.money",
        transactionId: userId,
        inputs: {
            "Name": name
        }
    },
    {
        headers: {
            "appId": "fhkqxf",
            "appKey": "gvyguja02rsx5t59wy54"
        }
    });
    
    console.log(startKycResponse.data.result.startKycUrl)
    setStartKycUrl(startKycResponse.data.result.startKycUrl);
  }

  // if(startKycUrl){
  //   return <WebView source={{ uri: startKycUrl}} />
  // }

  const header = () => {
    const router = useRouter();
    return (
      <View style={styles.heading}>
        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            onPress={() => {
              router.replace("/");
            }}
            activeOpacity={1}
          >
            <Image
              source={images.arrowLeft}
              alt="back"
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <Text style={styles.welcome}>envest</Text>
        </View>
        <View>
          <TouchableOpacity style={{ display: "flex", flexDirection: "row" }}>
            <Image
              source={images.help}
              style={{ width: 20, height: 20 }}
              alt="help"
            />
            <Text style={styles.help}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
        onPress={()=>handlePressCompleteKyc()}
      >
        <Text style={styles.butText}>Complete your KYC</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {header()}
      {title("Complete KYC in", " 120 seconds!")}
      {steps()}
      {button()}
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
