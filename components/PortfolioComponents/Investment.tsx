import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface AppProps {
  openIcon: any;
  closeIcon: any;
}

const Investment: React.FC<AppProps> = ({ openIcon, closeIcon }) => {
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
        <Text style={styles.title}>Investment Objective</Text>
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
            Blue-chip is a Cryptocurrency that has a large market cap with a
            proven record of performance over a period of time. This basket is
            made of seven different Cryptocurrencies. Having a large market cap
            makes these cryptocurrencies less volatile. Thus, eventually making
            this basket less volatile and immune to high risk. The crypto that
            we have included in this basket are major blockchains on top of
            which almost the entire Crypto ecosystem is standing. These are the
            foundations of the Crypto World. The portfolio is re-balanced
            monthly.{"\n"}
            {"\n"}
            The fund will seek long-term capital appreciation by investing in
            blue-chip crypto of the current time. {"\n"}
            The AUM will be invested in these various cryptocurrencies and will
            be re-balanced depending on the changing market trends. This is a
            category-agnostic fund.{"\n"}
            The fund is an ideal choice for a new investor. As per the changing
            market conditions, the fund will be re-balanced.{"\n"}
          </Text>
          <Text style={styles.text2}>
            {" "}
            Fund Benchmark - Global Crypto Market Cap
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

export default Investment;
