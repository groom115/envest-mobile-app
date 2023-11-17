import React from "react";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";

interface DataProps {
  title: string;
  desc: string;
  color: string;
}

interface OnBoardingItemProps {
  item: DataProps;
}
const OnBoardingItem: React.FC<OnBoardingItemProps> = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={[styles.container, { width, backgroundColor: `${item.color}` }]}
    >
      <View style={{ flex: 0.3, marginHorizontal: 16 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 28,
    marginBottom: 10,
    textAlign: "left",
  },
  desc: {
    fontWeight: "400",
    fontSize: 16,
    textAlign: "left",
  },
});
