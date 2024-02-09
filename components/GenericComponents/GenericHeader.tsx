import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import images from "../../constants/images";
import { useRouter } from "expo-router";

interface GenericHeaderProps {
  showLogo?: boolean;
}

const GenericHeader: React.FC<GenericHeaderProps> = ({ showLogo = true }) => {
  const router = useRouter();

  return (
    <View style={styles.heading}>
      <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          activeOpacity={0.7}
        >
          <Image
            source={images.arrowLeft}
            alt="back"
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
        {showLogo && <Text style={styles.welcome}>envest</Text>}
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

export default GenericHeader;

const styles = StyleSheet.create({
  heading: {
    display: "flex",
    flexDirection: "row",
    marginTop: 58,
    justifyContent: "space-between",
  },
  welcome: {
    color: "#FFD76F",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 24,
  },
  help: {
    color: "#FFF3D3",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
  },
});
