import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface AppProps {
  openIcon: any;
  closeIcon: any;
}

const FundDetails: React.FC<AppProps> = ({ openIcon, closeIcon }) => {
  const [open, setOpen] = useState<Boolean>(false);
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Fund Manager Details</Text>
        <TouchableOpacity
          onPress={() => {
            setOpen(!open);
          }}
          activeOpacity={1}
        >
          {open ? (
            <Image
              source={openIcon}
              alt="open"
              style={{ width: 24, height: 24 }}
            />
          ) : (
            <Image
              source={closeIcon}
              alt="close"
              style={{ width: 24, height: 24 }}
            />
          )}
        </TouchableOpacity>
      </View>
      {open && (
        <View style={{ marginTop: 15 }}>
          <Text style={styles.text1}>
            BlueChip Fund is a crypto portfolio built and managed by Ensuing
            Labs Private Limited (Envest). {"\n"}
            The Fund was made available for investors on 10 June 2023.{"\n"}
            The BlueChip Fund is a medium-risk fund. {"\n"}
            The minimum Investment amount for SIP is ₹50 & ₹2,000 for one-time
            investments.{"\n"}A commission of flat 1% on the investment amount
            will be charged by the fund manager.{"\n"}
            {"\n"}
            CIN - U72900PN2021PTC207250 Registered Company Name with MCA -
            Ensuing Labs Private Limited.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    borderTopWidth: 0.4,
    borderTopColor: "#979797",
  },
  title: {
    color: "#FFD76F",
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "600",
  },
  text1: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "500",
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "600",
  },
});

export default FundDetails;
