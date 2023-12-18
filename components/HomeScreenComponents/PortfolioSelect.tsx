import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface dataProps {
  getStockType: string;
  setStockType: any;
}
const PortfolioSelect = ({ getStockType, setStockType }: dataProps) => {
  return (
    <View>
      <Text style={[styles.invText, { marginHorizontal: 16 }]}>
        Invested Portfolio
      </Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.button,
            getStockType === "Blue Chip Crypto Portfolio"
              ? { backgroundColor: "#FFF3D3" }
              : null,
          ]}
          onPress={() => {
            setStockType("Blue Chip Crypto Portfolio");
          }}
          activeOpacity={1}
        >
          <Text
            style={[
              styles.text,
              getStockType === "Blue Chip Crypto Portfolio"
                ? { color: "black" }
                : { color: "white" },
            ]}
          >
            BlueChip Crypto Fund
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            getStockType === "Stable Fund"
              ? { backgroundColor: "#FFF3D3" }
              : null,
          ]}
          onPress={() => {
            setStockType("Stable Fund");
          }}
          activeOpacity={1}
        >
          <Text
            style={[
              styles.text,
              getStockType === "Stable Fund"
                ? { color: "black" }
                : { color: "white" },
            ]}
          >
            Stable Fund
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    display: "flex",
    flexDirection: "row",
    gap: 24,
    marginHorizontal: 16,
  },
  invText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
  },
  button: {
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#FFF3D3",
    borderRadius: 5,
  },
  text: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
  },
});

export default PortfolioSelect;
