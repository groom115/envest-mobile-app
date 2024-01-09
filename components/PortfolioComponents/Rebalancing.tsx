import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface AppProps {
  openIcon: any;
  closeIcon: any;
  documentText: any;
}

const Rebalancing: React.FC<AppProps> = ({
  openIcon,
  closeIcon,
  documentText,
}) => {
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
        <Text style={styles.title}>Rebalancing & Process</Text>
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
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.text1}>
            The portfolios are designed for a monthly rebalance. Depending on
            the market conditions as well as how the strategy is performing, we
            may or may not rebalance the portfolio on a monthly basis.{"\n"}
            The reason for rebalancing a portfolio is to ensure that it remains
            aligned with the investor's risk tolerance and investment goals over
            time. As the market values of different asset classes fluctuate, the
            proportion of assets in the portfolio may shift, causing the
            portfolio to become either too conservative or too aggressive for
            the investor's objectives.{"\n"}
            Read everything about Rebalancing and it’s process in the SID below.
          </Text>
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
            }}
          >
            <Image
              source={documentText}
              alt="doc"
              style={{ width: 20, height: 20 }}
            />
            <Text style={styles.text2}>Scheme Information Document (SID)</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    borderTopWidth: 1,
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
    color: "#FFD76F",
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "600",
  },
});

export default Rebalancing;
