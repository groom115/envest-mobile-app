import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import GenericHeader from "../../components/GenericComponents/GenericHeader";

const SellBasket = () => {
  const router = useRouter();
  const [wholeAmount, setWholeAmount] = useState<boolean>(true);

  const title = () => {
    return (
      <View style={{ marginTop: 18, paddingHorizontal: 16 }}>
        <Text style={styles.titleText1}>
          {" "}
          <Text style={{ color: "#FFD76F" }}>Sell </Text>BlueChip Crypto Basket
        </Text>
      </View>
    );
  };

  const tokenDetails = () => (
    <View style={styles.tokenContainer}>
      <Text style={styles.tokenText1}>Details</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "column", gap: 12 }}>
          <Text style={[styles.tokenText3, { marginTop: 8 }]}>Token</Text>
          <Text style={styles.tokenText2}>Bitcoin</Text>
          <Text style={styles.tokenText2}>Binance Coin</Text>
          <Text style={styles.tokenText2}>Ripple</Text>
          <Text style={styles.tokenText2}>Bitcoin</Text>
          <Text style={styles.tokenText2}>Binance Coin</Text>
          <Text style={styles.tokenText2}>Ripple</Text>
        </View>
        <View style={{ flexDirection: "column", gap: 12 }}>
          <Text style={[styles.tokenText3, { marginTop: 8 }]}>Price</Text>
          <Text style={styles.tokenText2}>₹40,00,000.56</Text>
          <Text style={styles.tokenText2}>₹4,00,000.12</Text>
          <Text style={styles.tokenText2}>₹250.84</Text>
          <Text style={styles.tokenText2}>₹40,00,000.56</Text>
          <Text style={styles.tokenText2}>₹4,00,000.12</Text>
          <Text style={styles.tokenText2}>₹250.84</Text>
        </View>
        <View style={{ flexDirection: "column", gap: 12 }}>
          <Text style={[styles.tokenText3, { marginTop: 8 }]}>Quantity</Text>
          <Text style={styles.tokenText2}>0.0054</Text>
          <Text style={styles.tokenText2}>0.0054</Text>
          <Text style={styles.tokenText2}>0.0054</Text>
          <Text style={styles.tokenText2}>0.0054</Text>
          <Text style={styles.tokenText2}>0.0054</Text>
          <Text style={styles.tokenText2}>0.0054</Text>
        </View>
        <View style={{ flexDirection: "column", gap: 12 }}>
          <Text style={[styles.tokenText3, { marginTop: 8 }]}>
            Total Amount
          </Text>
          <Text style={styles.tokenText2}>₹400.45</Text>
          <Text style={styles.tokenText2}>₹400.45</Text>
          <Text style={styles.tokenText2}>₹400.45</Text>
          <Text style={styles.tokenText2}>₹400.45</Text>
          <Text style={styles.tokenText2}>₹400.45</Text>
          <Text style={styles.tokenText2}>₹400.45</Text>
        </View>
      </View>
    </View>
  );
  const switchTabs = () => (
    <View style={styles.switchContainer}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          {
            width: "50%",
            paddingVertical: 8,
            alignItems: "center",
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
          },
          { backgroundColor: wholeAmount ? "#FFD76F" : "black" },
        ]}
        onPress={() => {
          setWholeAmount(true);
        }}
      >
        <Text
          style={[
            styles.switchText,
            { color: wholeAmount ? "black" : "white" },
          ]}
        >
          Whole
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          {
            width: "50%",
            paddingVertical: 8,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            alignItems: "center",
          },
          { backgroundColor: !wholeAmount ? "#FFD76F" : "black" },
        ]}
        onPress={() => {
          setWholeAmount(false);
        }}
      >
        <Text
          style={[
            styles.switchText,
            { color: !wholeAmount ? "black" : "white" },
          ]}
        >
          Partial
        </Text>
      </TouchableOpacity>
    </View>
  );
  const enterAmount = () => (
    <View style={{ marginTop: 40, alignItems: "center" }}>
      <Text style={styles.amountText1}>Sell Amount</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
        <Text style={styles.amountText4}>₹</Text>
        {wholeAmount ? (
          <Text style={styles.amountText2}>10000</Text>
        ) : (
          <TextInput
            style={styles.amountText2}
            placeholderTextColor={"#979797"}
            placeholder="amount"
          />
        )}
      </View>
    </View>
  );

  const netAmount = () => (
    <View style={{ marginTop: 40, paddingHorizontal: 16 }}>
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        <Text style={styles.tokenText1}>Net Receivable</Text>
        <Entypo name="info-with-circle" size={14} color="white" />
      </View>
      <Text style={styles.amountText3}>₹9954.65</Text>
    </View>
  );

  const tabButtons = () => {
    return (
      <View style={styles.tab}>
        <TouchableOpacity style={styles.tabBut2}>
          <Text style={styles.tabText}>Sell</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 16 }}>
        <GenericHeader showLogo={false} />
      </View>
      {title()}
      {switchTabs()}
      {enterAmount()}
      {tokenDetails()}
      {netAmount()}
      {tabButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    flex: 1,
  },
  titleText1: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
  },
  tokenContainer: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  order1: {
    borderBottomColor: "#979797",
    borderBottomWidth: 0.5,
  },
  order2: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switchContainer: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#FFD76F",
    flexDirection: "row",
    borderRadius: 6,
    marginHorizontal: 16,
    width: "55%",
  },
  switchText: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
  },
  amountText1: {
    color: "#979797",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
  },
  amountText2: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
    textAlign: "left",
    minWidth: 70,
  },
  amountText4: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 25,
  },
  amountText3: {
    color: "#FFD76F",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 17,
    marginTop: 8,
  },
  tokenText3: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
  },
  tokenText2: {
    color: "white",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
  },
  tokenText1: {
    color: "#979797",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
  },

  tab: {
    width: "100%",
    position: "absolute",
    paddingHorizontal: 16,
    paddingVertical: 13,
    backgroundColor: "black",
    bottom: 0,
  },

  tabBut2: {
    borderRadius: 8,
    paddingVertical: 13,
    backgroundColor: "#F23753",
    alignItems: "center",
    flex: 1,
  },

  tabText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
  },
});

export default SellBasket;
