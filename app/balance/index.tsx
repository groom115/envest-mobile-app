import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import images from "../../constants/images";

const Balance = () => {
  const header = () => {
    const router = useRouter();
    return (
      <View style={styles.heading}>
        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            onPress={() => {
              router.replace("/");
            }}
            activeOpacity={1}
          >
            <Image
              source={images.arrowLeft}
              alt="back"
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
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

  const content = () => {
    return (
      <View style={{ marginTop: 28, paddingHorizontal: 16 }}>
        <Text style={styles.text1}>INR Balance</Text>
        <Text style={styles.text2}>
          ₹ 18,343{" "}
          <Text style={{ color: "white", fontSize: 12, lineHeight: 15 }}>
            available balance
          </Text>
        </Text>
        <View style={{ marginTop: 20, flexDirection: "row", gap: 16 }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 24,
              paddingVertical: 8,
              backgroundColor: "#FFD76F",
              borderRadius: 6,
            }}
            activeOpacity={1}
          >
            <Text style={[styles.text3, { color: "black" }]}>UPI Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 24,
              paddingVertical: 8,
              borderRadius: 6,
              borderColor: "#FFD76F",
              borderWidth: 1,
            }}
            activeOpacity={1}
          >
            <Text style={[styles.text3, { color: "white" }]}>Withdraw INR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const dropDown = () => {
    const [open, setOpen] = useState<Boolean>(false);
    return (
      <View style={styles.container2}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <Text style={styles.title}>All transactions</Text>
          <TouchableOpacity
            onPress={() => {
              setOpen(!open);
            }}
            activeOpacity={1}
          >
            {open ? (
              <Image
                source={images.openDropDown}
                alt="open"
                style={{ width: 24, height: 24 }}
              />
            ) : (
              <Image
                source={images.closeDropDown}
                alt="close"
                style={{ width: 24, height: 24 }}
              />
            )}
          </TouchableOpacity>
        </View>
        {open && (
          <View style={styles.transaction}>
            <View style={{ gap: 5, flexDirection: "row" }}>
              <Image
                source={images.arrowDown}
                style={{ width: 20, height: 20, alignSelf: "center" }}
              />
              <View style={{ gap: 2 }}>
                <Text style={styles.transactionText}>INR Deposit</Text>
                <Text style={styles.transactionText2}>11 Dec 2023</Text>
              </View>
            </View>
            <View style={{ gap: 2 }}>
              <Text style={styles.transactionText3}>+ ₹12,000.45</Text>
              <Text style={[styles.transactionText2, { textAlign: "right" }]}>
                Bal: ₹50,000.96
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {header()}
      {content()}
      {dropDown()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    marginTop: 58,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  help: {
    color: "#FFF3D3",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
  },
  text1: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 25,
  },
  text2: {
    color: "#FFD76F",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 20,
    marginTop: 8,
  },
  text3: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
  },
  container2: {
    marginTop: 28,
    paddingVertical: 12,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#979797",
  },
  title: {
    color: "#979797",
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "600",
  },
  transaction: {
    paddingHorizontal: 16,
    borderBottomColor: "#979797",
    borderBottomWidth: 1,
    paddingVertical: 12,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  transactionText: {
    color: "white",
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "600",
  },
  transactionText2: {
    color: "#979797",
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "400",
  },
  transactionText3: {
    color: "#28FFA4",
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "600",
  },
});

export default Balance;
