import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface AppProps {
  openIcon: any;
  closeIcon: any;
}

const TaxImplication: React.FC<AppProps> = ({ openIcon, closeIcon }) => {
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
        <Text style={styles.title}>Tax Implications</Text>
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
        <View style={{ marginTop: 15 }}>
          <Text style={styles.text1}>
            As per tax laws introduced by the Indian Government in July 2022. A
            flat 30% tax is imposed on the gain in VDA (Virtual Digital Assets)
            along with a 1% TDS was imposed on the sell of VDAs.{"\n"}
            {"\n"}
            Taxes will be applicable at the same rate on all your investments in
            this Bluechip Fund.{"\n"}
            {"\n"}
            For example,{"\n"}
            {"\n"}
            Scenario 1: You make Profits{"\n"}
            {"\n"}
            If you invest ₹10,000 in the BlueChip fund on 1 January 2023 and
            sell all the received units for ₹15,000 on 1 October 2023, you make
            a profit of 50% (₹5,000) in the span of 10 months.{"\n"}
            With the TAX imposed, you will be liable to pay TDS & TAX: 
          </Text>
          <View style={{ paddingLeft: 8 }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.text1}>•</Text>
              <Text style={styles.text1}>
                1% of ₹15,000 will be deducted as TDS by the exchange/broker, in
                this case, ₹150 will be deducted as TDS.
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.text1}>•</Text>
              <Text style={styles.text1}>
                30% of your capital gain in taxes, in this case, ₹1,455 in
                taxes.
                {"\n"}
              </Text>
            </View>
          </View>
          <Text style={styles.text2}>Net receivable will be ₹13,395{"\n"}</Text>
          <Text style={styles.text1}>
            Scenario 2: You make losses{"\n"}
            {"\n"}
            If you invest ₹10,000 in the BlueChip fund on 1 January 2023 and
            sell all the received units for ₹5,000 on 1 October 2023, you make a
            loss of 50% (₹5,000) in the span of 10 months.{"\n"}
            With the TAX imposed, you will be liable to pay TDS & TAX:
          </Text>
          <View style={{ paddingLeft: 8 }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.text1}>•</Text>
              <Text style={styles.text1}>
                1% of ₹5,000 will be deducted as TDS by the exchange/broker, in
                this case, ₹50 will be deducted as TDS.
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.text1}>•</Text>
              <Text style={styles.text1}>
                Since there were no profits, capital gains tax won’t be imposed.
                {"\n"}
              </Text>
            </View>
          </View>
          <Text style={styles.text2}>Net receivable will be ₹4,950{"\n"}</Text>
          <Text style={styles.text1}>
            To understand or read more about tax, click{" "}
            <Text style={{ color: "#FFD76F" }}>here.</Text>
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
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "500",
  },
});

export default TaxImplication;
