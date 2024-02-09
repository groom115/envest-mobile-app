import React from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
interface DataProps {
  title: string;
  desc: string;
  color: string;
}

interface PaginatorProps {
  data: DataProps[];
  scrollX: any;
}

const Paginator: React.FC<PaginatorProps> = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { flexDirection: "row", height: 44 }]}>
      {data.map((item: any, index: number) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={index}
            style={[styles.dot, { width: 10, opacity }]}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "#FFD76F",
  },
});
