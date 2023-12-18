import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface dataProps {
  selectedTenure: string;
  setTenure: any;
}
const TenureSelect = ({ selectedTenure, setTenure }: dataProps) => {
  return (
    <View>
      <Text style={[styles.invText, { marginHorizontal: 16 }]}>Tenure</Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedTenure === "6M" ? { backgroundColor: "#FFF3D3" } : null,
          ]}
          onPress={() => {
            setTenure("6M");
          }}
          activeOpacity={1}
        >
          <Text
            style={[
              styles.text,
              selectedTenure === "6M" ? { color: "black" } : { color: "white" },
            ]}
          >
            6 M
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedTenure === "1Y" ? { backgroundColor: "#FFF3D3" } : null,
          ]}
          onPress={() => {
            setTenure("1Y");
          }}
          activeOpacity={1}
        >
          <Text
            style={[
              styles.text,
              selectedTenure === "1Y" ? { color: "black" } : { color: "white" },
            ]}
          >
            1 Y
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedTenure === "3Y" ? { backgroundColor: "#FFF3D3" } : null,
          ]}
          onPress={() => {
            setTenure("3Y");
          }}
          activeOpacity={1}
        >
          <Text
            style={[
              styles.text,
              selectedTenure === "3Y" ? { color: "black" } : { color: "white" },
            ]}
          >
            3 Y
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

export default TenureSelect;
