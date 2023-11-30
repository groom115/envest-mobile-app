import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OTPInput = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef<any>([]);
  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      const newOtp = [...otp];
      for (let i = 0; i < value.length && index + i < newOtp.length; i++) {
        newOtp[index + i] = value[i];
      }
      setOtp(newOtp);

      if (index + value.length - 1 < newOtp.length) {
        inputRef.current[index + value.length - 1].focus();
      }
    } else {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < newOtp.length - 1) {
        inputRef.current[index + 1].focus();
      }
    }
  };
  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace to move focus to the previous box
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      e.preventDefault();
      inputRef.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.box}
          maxLength={6}
          keyboardType="numeric"
          onChangeText={(value) => handleOtpChange(value, index)}
          value={digit}
          ref={(input) => {
            inputRef.current[index] = input;
          }}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  box: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
    width: 40,
    margin: 10,
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
});
export default OTPInput;
