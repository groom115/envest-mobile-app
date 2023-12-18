import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface dataProps {
  getInvestmentModel: string;
  setInvestmentModel: any;
}
const InvestmentModel = ({
  getInvestmentModel,
  setInvestmentModel,
}: dataProps) => {
  return (
    <View style={styles.sip}>
      <TouchableOpacity
        style={[
          styles.sipBut,
          getInvestmentModel === "SIP" ? { backgroundColor: "#FFF3D3" } : null,
        ]}
        onPress={() => {
          setInvestmentModel("SIP");
        }}
        activeOpacity={1}
      >
        <Text
          style={[
            styles.sipText,
            getInvestmentModel === "SIP"
              ? { color: "black" }
              : { color: "white" },
          ]}
        >
          SIP
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.sipBut,
          getInvestmentModel === "LUMPSUM"
            ? { backgroundColor: "#FFF3D3" }
            : null,
        ]}
        onPress={() => {
          setInvestmentModel("LUMPSUM");
        }}
        activeOpacity={1}
      >
        <Text
          style={[
            styles.sipText,
            getInvestmentModel === "LUMPSUM"
              ? { color: "black" }
              : { color: "white" },
          ]}
        >
          Lumpsum
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sip: {
    marginTop: 22,
    display: "flex",
    flexDirection: "row",
    gap: 24,
    marginHorizontal: 16,
  },
  sipText: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
  },
  sipBut: {
    paddingHorizontal: 28,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#FFF3D3",
    borderRadius: 5,
  },
});

export default InvestmentModel;
