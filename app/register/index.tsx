import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import images from "../../constants/images";
import {Auth} from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { useRouter } from "expo-router";

interface AppProps {}

const RegisterScreen: React.FC<AppProps> = () => {

  const router=useRouter();

  const handleGoogleLoginClick=()=>{
    try{
      Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google
      });
    } catch(error){
      console.error(error)
    }
  }

  const handleEmailLoginClick=()=>{
    router.push("/login");
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text1}>envest</Text>
        <Text style={styles.text2}>Register or Login</Text>
      </View>

      <View>
        <Image source={images.register} style={styles.image1} alt="" />
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={handleGoogleLoginClick}>
          <Image source={images.google} style={styles.image2} alt="" />
          <Text style={styles.text3}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecond} onPress={handleEmailLoginClick}>
          <Text style={styles.text3}>Continue with Email</Text>
        </TouchableOpacity>
        <Text style={styles.text4}>
          By proceeding, I accept envest’s TnC & privacy policy
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "black",
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  text1: {
    color: "#FFD76F",
    fontWeight: "400",
    fontSize: 36,
    lineHeight: 40,
  },
  text2: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 32,
    lineHeight: 44,
  },
  bottom: {
    bottom: 0,
  },
  text3: {
    color: "black",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 20,
  },
  text4: {
    color: "#979797",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    marginTop: 1,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  buttonSecond: {
    backgroundColor: "#FFD76F",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop:10,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  image1: {
    height: 380,
    width: "100%",
  },
  image2: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
});

export default RegisterScreen;
