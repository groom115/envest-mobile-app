import { Slider } from "@miblanchard/react-native-slider";
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

interface AppProps {
  data: any;
}

const ReturnCalculator: React.FC<AppProps> = ({ data }) => {
  const [getInvestmentModel, setInvestmentModel] = useState<string>("SIP");

  const [amount, setAmount] = useState<number>(50);
  const [tenure, setTenure] = useState<string>("1M");
  const [getAnnualRate, setAnnualRate] = useState(0);
  const [returns, setReturns] = useState<number>(0);
  const [getInvestedMoney, setInvestedMoney] = useState(0);

  useMemo(() => {
    if (data !== undefined) {
      if (getInvestmentModel === "SIP") {
        let annualRate =
          tenure === "1M"
            ? data["1M"]
            : tenure === "3M"
            ? data["3M"]
            : tenure === "6M"
            ? data["6M"]
            : tenure === "3Y"
            ? data["3Y"]
            : data["5Y"];

        setAnnualRate(annualRate);
        let monthlyRate = annualRate / 12 / 100;
        let years =
          tenure === "1M"
            ? 0.08
            : tenure === "3M"
            ? 0.25
            : tenure === "6M"
            ? 0.5
            : tenure === "3Y"
            ? 3
            : 5;
        let months = years * 12;
        setInvestedMoney(amount * months);
        let m = Number(monthlyRate.toFixed(2));

        setReturns(
          Math.round(
            ((Math.pow(
              1 + (Math.pow(1 + annualRate / 100, 1 / 12) - 1),
              years * 12
            ) -
              1) /
              (Math.pow(1 + annualRate / 100, 1 / 12) - 1)) *
              amount
          )
        );
      } else {
        let annualRate =
          tenure === "1M"
            ? data["1M"]
            : tenure === "3M"
            ? data["3M"]
            : tenure === "6M"
            ? data["6M"]
            : tenure === "3Y"
            ? data["3Y"]
            : data["5Y"];

        setAnnualRate(annualRate);
        let monthlyRate = annualRate / 100; //Rate of interest
        let years =
          tenure === "1M"
            ? 0.08
            : tenure === "3M"
            ? 0.25
            : tenure === "6M"
            ? 0.5
            : tenure === "3Y"
            ? 3
            : 5;
        setInvestedMoney(amount);
        setReturns(Math.round(Math.pow(1 + annualRate / 100, years) * amount));
      }
    }
  }, [amount, tenure, data, getInvestmentModel]);

  const thumbComp = () => {
    return (
      <View
        style={{
          height: 16,
          width: 16,
          backgroundColor: "#FFD76F",
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center", // Center the inner circle
        }}
      >
        <View
          style={{
            height: 8,
            width: 8,
            backgroundColor: "black",
            borderRadius: 4,
          }}
        ></View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Return Calculator</Text>
      </View>

      <View>
        <View style={styles.sip}>
          <TouchableOpacity
            style={[
              styles.sipBut,
              getInvestmentModel === "SIP"
                ? { backgroundColor: "#FFF3D3" }
                : { backgroundColor: "#333333" },
            ]}
            onPress={() => {
              setInvestmentModel("SIP");
            }}
            activeOpacity={1}
          >
            <Text
              style={[
                styles.sipText,
                getInvestmentModel === "SIP"
                  ? { color: "black" }
                  : { color: "#FFF3D3" },
              ]}
            >
              SIP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sipBut,
              getInvestmentModel === "OneTime"
                ? { backgroundColor: "#FFF3D3" }
                : { backgroundColor: "#333333" },
            ]}
            onPress={() => {
              setInvestmentModel("OneTime");
            }}
            activeOpacity={1}
          >
            <Text
              style={[
                styles.sipText,
                getInvestmentModel === "OneTime"
                  ? { color: "black" }
                  : { color: "#FFF3D3" },
              ]}
            >
              OneTime
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 24, flex: 1 }}>
          <Text style={styles.text1}>
            ₹ {amount}{" "}
            <Text
              style={{
                color: "#979797",
                fontSize: 11,
                fontWeight: "400",
              }}
            >
              per month
            </Text>
          </Text>
          <Slider
            minimumValue={50}
            maximumValue={1000000}
            step={10}
            value={amount}
            onValueChange={(e: any) => {
              setAmount(e);
            }}
            minimumTrackTintColor="#FFD76F"
            maximumTrackTintColor="#3C3835"
            trackClickable={true}
            trackStyle={{ height: 5 }}
            renderThumbComponent={thumbComp}
          />
        </View>

        <View style={{ marginTop: 16, gap: 20, flexDirection: "row" }}>
          <Text style={styles.text2}>Tenure</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={[
                styles.tenureBut,
                tenure === "1M"
                  ? { backgroundColor: "#FFF3D3" }
                  : { backgroundColor: "black" },
              ]}
              onPress={() => {
                setTenure("1M");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.tenureText,
                  tenure === "1M" ? { color: "black" } : { color: "white" },
                ]}
              >
                1 M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tenureBut,
                tenure === "3M"
                  ? { backgroundColor: "#FFF3D3" }
                  : { backgroundColor: "black" },
              ]}
              onPress={() => {
                setTenure("3M");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.tenureText,
                  tenure === "3M" ? { color: "black" } : { color: "white" },
                ]}
              >
                3 M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tenureBut,
                tenure === "6M"
                  ? { backgroundColor: "#FFF3D3" }
                  : { backgroundColor: "black" },
              ]}
              onPress={() => {
                setTenure("6M");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.tenureText,
                  tenure === "6M" ? { color: "black" } : { color: "white" },
                ]}
              >
                6 M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tenureBut,
                tenure === "3Y"
                  ? { backgroundColor: "#FFF3D3" }
                  : { backgroundColor: "black" },
              ]}
              onPress={() => {
                setTenure("3Y");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.tenureText,
                  tenure === "3Y" ? { color: "black" } : { color: "white" },
                ]}
              >
                3 Y
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tenureBut,
                tenure === "5Y"
                  ? { backgroundColor: "#FFF3D3" }
                  : { backgroundColor: "black" },
              ]}
              onPress={() => {
                setTenure("5Y");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.tenureText,
                  tenure === "5Y" ? { color: "black" } : { color: "white" },
                ]}
              >
                5 Y
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={[styles.tenureText, { color: "white" }]}>
            Your Investments of ₹ {getInvestedMoney}
          </Text>
          <Text style={styles.text3}>
            Would have become{" "}
            <Text style={{ color: "#FFD76F" }}>₹ {returns}</Text>{" "}
            <Text style={{ color: "#28FFA4" }}>({getAnnualRate})</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    marginTop: 28,
  },
  title: {
    color: "#FFD76F",
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "600",
  },
  sip: {
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    gap: 24,
  },
  sipText: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
  },
  sipBut: {
    paddingHorizontal: 28,
    paddingVertical: 8,

    borderRadius: 5,
  },

  amountText: {
    color: "#000000",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    minWidth: 46,
  },
  invText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
  },
  text1: {
    color: "#FFD76F",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
  },
  text2: {
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,
    color: "white",
    alignSelf: "center",
  },
  tenureBut: {
    width: 30,
    borderRadius: 6,
    borderColor: "#FFF3D3",
    borderWidth: 1,
    paddingVertical: 5,
    alignItems: "center",
  },
  tenureText: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
  },
  text3: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
    color: "white",
  },
});

export default ReturnCalculator;
