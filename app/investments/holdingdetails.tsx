import React, { useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import GenericBottomSheet from "../../components/GenericComponents/GenericBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GenericHeader from "../../components/GenericComponents/GenericHeader";

const HoldingDetail = () => {
  const router = useRouter();
  const investBottomSheetRef = useRef<BottomSheetModal>(null);
  const params = useLocalSearchParams();
  const investment = JSON.parse(params.investment as any);

  const title = () => {
    return (
      <View style={{ marginTop: 28, paddingHorizontal: 16 }}>
        <Text style={styles.titleText1}>Investment Details</Text>
        <Text style={styles.titleText3}>{params.basket}</Text>
      </View>
    );
  };

  const investBottomSheet = () => (
    <GenericBottomSheet bottomSheetRef={investBottomSheetRef} height={22}>
      <View style={styles.bottomSheetCont}>
        <View>
          <Text style={styles.investBottomSheetText1}>
            Hey <Text style={{ color: "#FFD76F" }}>Krishna</Text>
          </Text>
          <Text style={styles.investBottomSheetText1}>
            Would you like to start a SIP or invest one-time?
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: "#28FFA4",
              width: 154,
              borderRadius: 6,
              alignItems: "center",
              paddingVertical: 13,
            }}
          >
            <Text style={styles.investBottomSheetText2}>One-time</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#28FFA4",
              width: 154,
              alignItems: "center",
              paddingVertical: 13,
              borderRadius: 6,
            }}
          >
            <Text style={styles.investBottomSheetText2}>Start SIP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GenericBottomSheet>
  );

  const orderDetails = () => {
    const gains: number = Number(
      (investment.currentAmount - investment.investedAmount).toFixed(2)
    );
    return (
      <View style={styles.orderContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={styles.orderText1}>Total Invested</Text>
            <Text style={styles.orderText1}>Current Value</Text>
            <Text style={styles.orderText1}>Total Returns</Text>
          </View>
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={styles.orderText1}>
              ₹ {investment.investedAmount.toFixed(2)}
            </Text>
            <Text style={styles.orderText1}>
              ₹ {investment.currentAmount.toFixed(2)}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  styles.orderText3,
                  { color: gains > 0 ? "#28FFA4" : "red" },
                ]}
              >
                ₹{" "}
                {(investment.currentAmount - investment.investedAmount).toFixed(
                  2
                )}
              </Text>
              <Text
                style={[
                  styles.orderText4,
                  { color: gains > 0 ? "#28FFA4" : "red" },
                ]}
              >
                {" "}
                ({(gains / investment.investedAmount).toFixed(2)}%)
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        >
          <Text style={styles.orderText1}>Total Token Holdings</Text>
          <Text style={styles.orderText1}>Total Quantity</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={styles.orderText2}>Bitcoin</Text>
            <Text style={styles.orderText2}>Binance Coin</Text>
            <Text style={styles.orderText2}>Ethereum</Text>
            <Text style={styles.orderText2}>Litecoin</Text>
            <Text style={styles.orderText2}>Tether</Text>
            <Text style={styles.orderText2}>Cardano</Text>
            <Text style={styles.orderText2}>Ripple</Text>
          </View>
          <View
            style={{ flexDirection: "column", gap: 8, alignItems: "flex-end" }}
          >
            <Text style={styles.orderText2}>
              {investment.constituents["BTC/INR"]}
            </Text>
            <Text style={styles.orderText2}>
              {investment.constituents["BNB/INR"]}
            </Text>
            <Text style={styles.orderText2}>
              {investment.constituents["ETH/INR"]}
            </Text>
            <Text style={styles.orderText2}>
              {investment.constituents["LTC/INR"]}
            </Text>
            <Text style={styles.orderText2}>
              {investment.constituents["USDT/INR"]}
            </Text>
            <Text style={styles.orderText2}>
              {investment.constituents["ADA/INR"]}
            </Text>
            <Text style={styles.orderText2}>
              {investment.constituents["XRP/INR"]}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const pastOrders = () => (
    <View style={styles.pastOrderContainer}>
      <Text style={styles.pastOrderText1}>Past Orders</Text>
    </View>
  );

  const tabButtons = () => {
    return (
      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.tabBut}
          activeOpacity={0.7}
          onPress={() => {
            router.replace("investments/sell");
          }}
        >
          <Text style={styles.tabText}>Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabBut2}
          activeOpacity={0.7}
          onPress={() => {
            investBottomSheetRef.current?.present();
          }}
        >
          <Text style={styles.tabText2}>Invest more</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <GenericHeader showLogo={false} />
        </View>
        {title()}
        {orderDetails()}
        {pastOrders()}
        {tabButtons()}
        {investBottomSheet()}
      </GestureHandlerRootView>
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
    fontSize: 20,
    lineHeight: 25,
  },
  titleText2: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 20,
    marginTop: 28,
  },
  titleText3: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    marginTop: 28,
  },
  orderContainer: {
    marginTop: 20,
    borderTopColor: "#979797",
    borderTopWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 20,
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
  orderText1: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
  },
  orderText2: {
    color: "white",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
  },
  orderText3: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    alignSelf: "center",
  },
  orderText4: {
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 12,
  },
  pastOrderContainer: {
    borderTopColor: "#979797",
    borderTopWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  pastOrderText1: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
  },
  tab: {
    width: "100%",
    position: "absolute",
    paddingHorizontal: 16,
    paddingVertical: 13,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 0,
  },
  tabBut: {
    borderRadius: 8,
    borderColor: "#FFD76F",
    borderWidth: 1,
    paddingVertical: 13,
    width: "45%",
    alignItems: "center",
  },
  tabBut2: {
    borderRadius: 8,
    borderColor: "#FFD76F",
    borderWidth: 1,

    paddingVertical: 13,
    backgroundColor: "#FFD76F",
    width: "45%",
    alignItems: "center",
  },
  tabText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
  },
  tabText2: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
  },
  investBottomSheetText1: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
  },
  investBottomSheetText2: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
  },
  bottomSheetCont: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
});

export default HoldingDetail;
