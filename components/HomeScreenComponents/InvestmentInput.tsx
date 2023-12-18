import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

interface dataProps {
  amount: number;
  setAmount: any;
}

const InvestmentInput = ({ amount, setAmount }: dataProps) => {
  const thumbComp = () => {
    return (
      <View
        style={{
          height: 16,
          width: 16,
          backgroundColor: "#FFD76F",
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center", // Center the inner circle
        }}
      >
        <View
          style={{
            height: 8,
            width: 8,
            backgroundColor: "black",
            borderRadius: 4,
          }}
        ></View>
      </View>
    );
  };
  return (
    <View>
      <View
        style={{
          marginTop: 40,
          display: "flex",
          flexDirection: "row",
          marginHorizontal: 16,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.invText}>Monthly Investment</Text>
        <View style={styles.invInput}>
          <Text style={styles.text}>₹</Text>
          <TextInput
            style={styles.amountText}
            keyboardType="numeric"
            value={amount.toString()}
            onChangeText={(e) => {
              const parsedValue = parseInt(e, 10);
              if (!isNaN(parsedValue)) {
                setAmount(parsedValue);
              } else {
                setAmount(50);
              }
            }}
          />
        </View>
      </View>
      <View style={{ marginTop: 10, flex: 1, marginHorizontal: 16 }}>
        <Slider
          minimumValue={50}
          maximumValue={1000000}
          step={10}
          value={amount}
          onValueChange={(e: any) => {
            setAmount(e);
          }}
          minimumTrackTintColor="#FFD76F"
          maximumTrackTintColor="#3C3835"
          trackClickable={true}
          trackStyle={{ height: 5 }}
          renderThumbComponent={thumbComp}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  invInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FFF3D3",
    gap: 15,
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
  },
  amountText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    minWidth: 46,
  },
  invText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
  },
  text: {
    color: "#000000",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
  },
});
export default InvestmentInput;
