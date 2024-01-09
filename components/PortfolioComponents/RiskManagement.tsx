import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface AppProps {
  openIcon: any;
  closeIcon: any;
  documentText: any;
}

const RiskManagement: React.FC<AppProps> = ({
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
        <Text style={styles.title}>Algorithms & Risk Management</Text>
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
            Envest empowers its users by allowing them to invest in carefully
            curated portfolios of crypto assets.{"\n"} Recognizing that the
            investment needs and risk appetites of investors would vary, each
            portfolio is envisioned with an aim/theme in mind, focusing on
            serving the needs of a diverse investor pool. With a fundamental
            goal in mind, various quantitative risk and return metrics are
            established which would form the basis of portfolio analysis. Our
            team then thoroughly vets multiple cryptocurrency tokens to curate a
            shortlist of relevant tokens adhering to the portfolio aim.
            Portfolio assets are selected by fundamentally analyzing tokens and
            taking into account factors like past performance, future prospects,
            financial viability, and market sentiment.{"\n"} Using the methods
            mentioned in the document below, we construct multiple portfolios
            which are then independently assessed by using pre-defined
            quantitative metrics.{"\n"} Each portfolio is back-tested using
            available market data to compute the annualized and absolute market
            returns.
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

export default RiskManagement;
