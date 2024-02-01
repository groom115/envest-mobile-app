import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import images from "../../../constants/images";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../global/store";

const BavScreen = () => {
  const router = useRouter();
  const bankVerified=useSelector((state: RootState)=>state.profile.bankVerified)

  const header = () => {
    return (
      <View style={styles.heading}>
        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            activeOpacity={0.7}
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
            <Text style={styles.stepText1}>Bank Details Verification</Text>
            <Text style={styles.stepText2}>
                Provide Account Number & IFSC Code.
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const button = () => {
    return (
      <TouchableOpacity
        style={{ borderRadius: 5, marginTop: 32, backgroundColor: "#FFD76F" }}
      >
        <Text style={styles.butText}>Verify Bank Account</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {header()}
      {title(bankVerified?"Your bank account is":"Complete BAV in", bankVerified?" Verified!": " 45 seconds!")}
      {steps()}
      {!bankVerified && button()}
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

export default BavScreen;
