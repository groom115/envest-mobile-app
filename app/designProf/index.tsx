import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import images from "../../constants/images";
import { useRouter } from "expo-router";

const DesignProf = () => {
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
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
          <Text style={styles.stepText}>Step 1</Text>
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
            gap: 12,
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
            gap: 12,
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
});

export default DesignProf;
