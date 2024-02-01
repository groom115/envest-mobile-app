import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import images from "../../constants/images";

interface AppProps {}

const OTPScreen: React.FC<AppProps> = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const countrycode = "+91";
  const handleGetOtp = () => {
    const otp = "123456";
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text1}>envest</Text>
        <Text style={styles.text2}>Mobile Number</Text>
        <Text style={styles.text3}>Please use your Aadhar linked number.</Text>
      </View>
      <View style={styles.phoneInputContainer}>
        <Text style={styles.countryCode}>{countrycode}</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          placeholderTextColor={"white"}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGetOtp}>
        <Text style={styles.buttonText}>Get OTP</Text>
      </TouchableOpacity>
      <View style={styles.checkboxContainer}>
        <Image source={images.tick} alt="tick" style={styles.image} />
        <Text style={styles.label}>
          I agree to receive investment, SIP & other updates.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 20,
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 32,
    lineHeight: 44,
  },
  text3: {
    color: "#979797",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 20,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
  },
  countryCode: {
    fontSize: 16,
    paddingHorizontal: 5,
    color: "white",
  },
  input: {
    height: 40,
    flex: 1,
    borderLeftColor: "gray",
    borderLeftWidth: 1,
    paddingHorizontal: 10,
    color: "white",
  },
  button: {
    backgroundColor: "#FFD76F",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },

  label: {
    color: "#979797",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    marginLeft: 8,
  },
  image: {
    height: 10,
    width: 10,
  },
});

export default OTPScreen;
