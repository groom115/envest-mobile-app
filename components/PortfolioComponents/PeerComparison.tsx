import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  PORTFOLIO_FINANCE_SPLIT_BLUE_CHIP,
  PORTFOLIO_FINANCE_SPLIT_STABLE_FUNDS,
} from "../../constants/portfolioConstant";

interface AppProps {
  openIcon: any;
  closeIcon: any;
  slug: string;
}

const PeerComparison: React.FC<AppProps> = ({ openIcon, closeIcon, slug }) => {
  const [open, setOpen] = useState<Boolean>(false);

  const res =
    slug === "bluechip-crypto-fund"
      ? PORTFOLIO_FINANCE_SPLIT_BLUE_CHIP
      : PORTFOLIO_FINANCE_SPLIT_STABLE_FUNDS;
  const data = res.slice(1);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Peer Comparison</Text>
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
        <View
          style={{
            marginVertical: 15,
            backgroundColor: "#343434",
            borderRadius: 5,
            paddingHorizontal: 7,
            paddingVertical: 12,
          }}
        >
          <View style={{ flexDirection: "row", gap: 36, paddingBottom: 12 }}>
            <View style={styles.cell1}>
              <Text style={styles.text1}>Funds/Indexes/Coins</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <View style={styles.cell2}>
                <Text style={styles.text1}>6M</Text>
              </View>

              <View style={styles.cell2}>
                <Text style={styles.text1}>1Y</Text>
              </View>

              <View style={styles.cell2}>
                <Text style={styles.text1}>3Y</Text>
              </View>
            </View>
          </View>
          {data.map((item: any, index: number) => {
            return (
              <View key={index} style={styles.tableView}>
                <View style={styles.cell1}>
                  <Text style={styles.text2}>{item.FUNDS}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.cell2}>
                    <Text style={styles.text2}>{item.SIX_MONTH}</Text>
                  </View>
                  <View style={styles.cell2}>
                    <Text style={styles.text2}>{item.ONE_YEAR}</Text>
                  </View>
                  <View style={styles.cell2}>
                    <Text style={styles.text2}>{item.THREE_YEAR}</Text>
                  </View>
                </View>
              </View>
            );
          })}
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
    fontWeight: "600",
    textAlign: "left",
  },
  cell1: {
    width: 88,
  },
  cell2: {
    width: 40,
    display: "flex",
    alignItems: "center",
  },
  tableView: {
    borderTopWidth: 1,
    borderTopColor: "#979797",
    paddingVertical: 12,
    flexDirection: "row",
    gap: 36,
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "400",
    textAlign: "left",
  },
});

export default PeerComparison;
