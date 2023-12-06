import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import images from "../../constants/images";
import { Link } from "expo-router";
import PieChart from "react-native-pie-chart";
import { Slider } from "@miblanchard/react-native-slider";

interface AppProps {}

const separater = (title: string, sub: string) => {
  return (
    <View style={styles.break}>
      <Text style={styles.text1}>
        {title} <Text style={{ color: "#FFD76F" }}>{sub}</Text>
      </Text>
      <View style={styles.line}></View>
    </View>
  );
};
const seperaterOp = (title: string, sub: string) => {
  return (
    <View style={styles.break}>
      <Text style={[styles.text1, { color: "#FFD76F" }]}>
        {title} <Text style={{ color: "#FFFFFF" }}>{sub}</Text>
      </Text>
      <View style={styles.line}></View>
    </View>
  );
};

const stockType = (title: string, icon: any, returns: string) => {
  return (
    <View style={styles.fund}>
      <Image
        source={icon}
        style={{ width: 46, height: 46, alignSelf: "center" }}
      />
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.title}>{title}</Text>

          <TouchableOpacity
            // onPress={handlePress}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              marginTop: 25,
            }}
          >
            <Link href={"/bluechip"}>
              <Text style={styles.fundText3}>
                Start SIP with <Text style={{ fontWeight: "700" }}>₹50</Text>{" "}
              </Text>

              <Image
                source={images.rightIcon}
                style={{ width: 12, height: 12 }}
                alt="icon"
              />
            </Link>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.fundText1}>{returns}</Text>
          <Text style={styles.fundText2}>3Y Returns</Text>
        </View>
      </View>
    </View>
  );
};

const options = (title: string, sub: string, icon: any, iconWidth: number) => {
  return (
    <View style={styles.optionBox}>
      <Image
        source={icon}
        style={{ height: 24, width: iconWidth }}
        alt="icon"
      />
      <Text style={styles.optionText}>
        {title} <Text style={{ fontWeight: "400" }}>{sub}</Text>
      </Text>
    </View>
  );
};
const heading = () => {
  return (
    <View style={styles.heading}>
      <Text style={styles.welcome}>
        Welcome, <Text style={{ color: "#FFD76F" }}>Krishna!</Text>{" "}
      </Text>
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

const kycSetUp = () => {
  return (
    <View style={styles.kycBox}>
      <Image
        source={images.kyc}
        style={{ height: 60, width: 60, alignSelf: "center" }}
      />
      <View style={styles.textBox}>
        <Text style={styles.kycText}>
          Complete setting up KYC of your account to start Investing.
        </Text>
        <TouchableOpacity style={styles.setupBut}>
          <Text style={styles.setupText}>Setup Now</Text>
          <Image
            source={images.setupIcon}
            style={{ width: 20, height: 20 }}
            alt="icon"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const chartPoints = () => {
  return (
    <View style={{ marginTop: 24, marginHorizontal: 18 }}>
      <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#D0FFEB",
              width: 20,
              height: 6,
              borderRadius: 5,
            }}
          ></View>
          <Text style={styles.estimateText}>Invested Amount</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#28FFA4",
              width: 20,
              height: 6,
              borderRadius: 5,
            }}
          ></View>
          <Text style={styles.estimateText}>Estimated Returns</Text>
        </View>
      </View>
    </View>
  );
};

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
const HomeScreen: React.FC<AppProps> = () => {
  const [getInvestmentModel, setInvestmentModel] = useState<string>("SIP");
  const [amount, setAmount] = useState<number>(50);
  const [getStockType, setStockType] = useState<string>(
    "Blue Chip Crypto Portfolio"
  );
  const [selectedTenure, setTenure] = useState<string>("6M");

  const [getRetuns, setReturns] = useState(0);
  const [getAnnualRate, setAnnualRate] = useState(0);
  const [getInvestedMoney, setInvestedMoney] = useState(0);
  const [getDonutData, setDonutData] = useState<number[]>([300, 9]);

  const sliceColor = ["#D0FFEB", "#28FFA4"];

  useEffect(() => {
    const updateDonutData = () => {
      setDonutData([getInvestedMoney, getRetuns]);
    };
    updateDonutData();
  }, [amount, selectedTenure, getInvestmentModel, getStockType]);

  useMemo(() => {
    if (getInvestmentModel === "SIP") {
      if (getStockType === "Blue Chip Crypto Portfolio") {
        let tenureSelected = selectedTenure.at(0);
        let annualRate =
          tenureSelected === "6"
            ? 15.3
            : tenureSelected === "1"
            ? -15.86
            : tenureSelected === "3"
            ? 58.19
            : 148.31;
        setAnnualRate(annualRate);
        let monthlyRate = annualRate / 12 / 100; //Rate of interest
        // console.log("monthly rate: "+monthlyRate.toFixed(5));
        let years =
          selectedTenure === "6M"
            ? 0.5
            : Number(selectedTenure.substring(0, 1));
        let months = years * 12; //Time period
        // console.log("years ",years," months ", months," typeof month ",typeof months, " slider value ",getSliderValue )
        setInvestedMoney(amount * months);
        let m = Number(monthlyRate.toFixed(2));
        // console.log(typeof m , m);
        // M = P × ({[1 + i]^n – 1} / i) × (1 + i).
        //  M = 1,000X ({[1 +0.01 ]^{12} – 1} / 0.01) x (1 + 0.01)

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
        let tenureSelected = selectedTenure.at(0);
        let annualRate =
          tenureSelected === "6"
            ? 9.01
            : tenureSelected === "1"
            ? -9.44
            : tenureSelected === "3"
            ? 49.11
            : 147.5;
        setAnnualRate(annualRate);
        let monthlyRate = annualRate / 100; //Rate of interest
        let years =
          selectedTenure === "6M"
            ? 0.5
            : Number(selectedTenure.substring(0, 1));
        let months = years * 12; //Time period
        setInvestedMoney(amount * months);
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
      }
    } else {
      if (getStockType === "Blue Chip Crypto Portfolio") {
        let tenureSelected = selectedTenure.at(0);
        let annualRate =
          tenureSelected === "6"
            ? 15.36
            : tenureSelected === "1"
            ? -15.86
            : tenureSelected === "3"
            ? 295.9
            : 15209.56;
        setAnnualRate(annualRate);
        let monthlyRate = annualRate / 100; //Rate of interest
        let years =
          selectedTenure === "6M"
            ? 0.5
            : Number(selectedTenure.substring(0, 1));
        setInvestedMoney(amount);
        setReturns(Math.round(Math.pow(1 + annualRate / 100, years) * amount));
      } else {
        let tenureSelected = selectedTenure.at(0);
        let annualRate =
          tenureSelected === "6"
            ? 9.01
            : tenureSelected === "1"
            ? -9.44
            : tenureSelected === "3"
            ? 231.56
            : 14995.5;
        setAnnualRate(annualRate);
        let monthlyRate = annualRate / 100; //Rate of interest
        let years =
          selectedTenure === "6M"
            ? 0.5
            : Number(selectedTenure.substring(0, 1));
        setInvestedMoney(amount);
        setReturns(Math.round(Math.pow(1 + annualRate / 100, years) * amount));
      }
    }
  }, [getInvestmentModel, amount, selectedTenure, getStockType]);

  return (
    <ScrollView style={styles.container}>
      <View>
        {heading()}
        <View style={{ marginTop: 28 }}>
          {separater("Complete KYC in under", "120 seconds")}
          {kycSetUp()}
        </View>
        <View style={{ marginTop: 40 }}>
          {separater("Begin your crypto journey with just ", "₹50")}
          {stockType("BlueChip Crypto Fund", images.blueChip, "58.19%")}
          {stockType("Stable Fund", images.stableFund, "49.11%")}
        </View>
        <View style={{ marginTop: 40 }}>
          {separater("Why choose ", "envest?")}
          <View style={styles.options}>
            {options("No ", "Lock-in", images.lock, 24)}
            {options("Fast ", "deposits", images.upiIcon, 49)}
            {options("24x7 ", "Support", images.headset, 24)}
          </View>
        </View>
        <View style={{ marginTop: 40 }}>
          {seperaterOp("Returns", "you would have generated")}
          <View style={styles.sip}>
            <TouchableOpacity
              style={[
                styles.sipBut,
                getInvestmentModel === "SIP"
                  ? { backgroundColor: "#FFF3D3" }
                  : null,
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
                    : { color: "white" },
                ]}
              >
                SIP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sipBut,
                getInvestmentModel === "LUMPSUM"
                  ? { backgroundColor: "#FFF3D3" }
                  : null,
              ]}
              onPress={() => {
                setInvestmentModel("LUMPSUM");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.sipText,
                  getInvestmentModel === "LUMPSUM"
                    ? { color: "black" }
                    : { color: "white" },
                ]}
              >
                Lumpsum
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "row",
            marginHorizontal: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.invText}>Monthly Investment</Text>
          <View style={styles.invInput}>
            <Text style={styles.setupText}>₹</Text>
            <TextInput
              style={styles.amountText}
              keyboardType="numeric"
              value={amount.toString()}
              onChangeText={(e) => {
                const parsedValue = parseInt(e, 10);
                if (!isNaN(parsedValue)) {
                  setAmount(parsedValue);
                } else {
                  setAmount(50);
                }
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 10, flex: 1, marginHorizontal: 16 }}>
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
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.invText, { marginHorizontal: 16 }]}>
            Invested Portfolio
          </Text>
          <View style={styles.sip}>
            <TouchableOpacity
              style={[
                styles.fundBut,
                getStockType === "Blue Chip Crypto Portfolio"
                  ? { backgroundColor: "#FFF3D3" }
                  : null,
              ]}
              onPress={() => {
                setStockType("Blue Chip Crypto Portfolio");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.sipText,
                  getStockType === "Blue Chip Crypto Portfolio"
                    ? { color: "black" }
                    : { color: "white" },
                ]}
              >
                BlueChip Crypto Fund
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.fundBut,
                getStockType === "Stable Fund"
                  ? { backgroundColor: "#FFF3D3" }
                  : null,
              ]}
              onPress={() => {
                setStockType("Stable Fund");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.sipText,
                  getStockType === "Stable Fund"
                    ? { color: "black" }
                    : { color: "white" },
                ]}
              >
                Stable Fund
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.invText, { marginHorizontal: 16 }]}>Tenure</Text>
          <View style={styles.sip}>
            <TouchableOpacity
              style={[
                styles.fundBut,
                selectedTenure === "6M" ? { backgroundColor: "#FFF3D3" } : null,
              ]}
              onPress={() => {
                setTenure("6M");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.sipText,
                  selectedTenure === "6M"
                    ? { color: "black" }
                    : { color: "white" },
                ]}
              >
                6 M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.fundBut,
                selectedTenure === "1Y" ? { backgroundColor: "#FFF3D3" } : null,
              ]}
              onPress={() => {
                setTenure("1Y");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.sipText,
                  selectedTenure === "1Y"
                    ? { color: "black" }
                    : { color: "white" },
                ]}
              >
                1 Y
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.fundBut,
                selectedTenure === "3Y" ? { backgroundColor: "#FFF3D3" } : null,
              ]}
              onPress={() => {
                setTenure("3Y");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.sipText,
                  selectedTenure === "3Y"
                    ? { color: "black" }
                    : { color: "white" },
                ]}
              >
                3 Y
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 34, marginHorizontal: 18 }}>
          <Text style={styles.calcText}>
            Your investment of{" "}
            <Text style={{ color: "#FFD76F" }}>₹ {getInvestedMoney} </Text>{" "}
          </Text>
          <Text style={styles.calcText}>
            Over a{" "}
            <Text style={{ color: "#FFD76F" }}>
              {selectedTenure === "6M"
                ? "6 Month"
                : selectedTenure === "1Y"
                ? "1 Year"
                : selectedTenure === "3Y"
                ? "3 Year"
                : "Unknown Period"}{" "}
              Period
            </Text>{" "}
          </Text>
          <Text style={styles.calcText}>
            Would have become an amount of {"\n"}
            <Text style={{ color: "#FFD76F" }}>
              {" "}
              ₹ {getRetuns.toFixed(2)}
            </Text>{" "}
          </Text>
        </View>
        {chartPoints()}
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PieChart
            widthAndHeight={220}
            series={getDonutData}
            sliceColor={sliceColor}
            coverRadius={0.55}
            coverFill={null}
          />
        </View>
        <TouchableOpacity style={styles.invBut}>
          <Text style={styles.butText}>Start Investing</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

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
  welcome: {
    color: "white",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 24,
  },
  help: {
    color: "#FFF3D3",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
  },
  break: {
    marginLeft: 16,
    display: "flex",
    flexDirection: "row",
  },
  text1: {
    color: "white",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    marginRight: 10,
  },
  line: {
    borderBottomColor: "#BEBEBE",
    borderBottomWidth: 1,
    width: "100%",
    alignSelf: "center",
  },
  kycBox: {
    marginHorizontal: 16,
    marginTop: 22,
    // backgroundImage: "linear-gradient(to right, #343434, #242424)",
    backgroundColor: "#343434",
    display: "flex",
    flexDirection: "row",
    padding: 16,
    borderRadius: 5,
  },
  kycText: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    paddingRight: 30,
  },
  textBox: {
    paddingHorizontal: 20,
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  setupBut: {
    backgroundColor: "#FFD76F",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    marginTop: 20,
  },
  setupText: {
    color: "#000000",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
  },
  fund: {
    marginTop: 25,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "#343434",
    display: "flex",
    flexDirection: "row",
    gap: 22,
    borderRadius: 5,
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
  },
  fundText1: {
    color: "#28FFA4",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
  },
  fundText2: {
    color: "#979797",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 13,
  },
  fundText3: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
  },
  options: {
    marginTop: 22,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 16,
  },
  optionBox: {
    backgroundColor: "#5EFFDA",
    paddingVertical: 14,
    alignItems: "center",
    width: 86,
    borderRadius: 5,
  },
  optionText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 15,
    marginTop: 10,
  },
  sip: {
    marginTop: 22,
    display: "flex",
    flexDirection: "row",
    gap: 24,
    marginHorizontal: 16,
  },
  sipText: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
  },
  sipBut: {
    paddingHorizontal: 28,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#FFF3D3",
    borderRadius: 5,
  },
  invInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FFF3D3",
    gap: 15,
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
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
  fundBut: {
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#FFF3D3",
    borderRadius: 5,
  },
  calcText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 25,
    textAlign: "left",
    marginTop: 10,
  },
  butText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 20,
  },
  invBut: {
    marginHorizontal: 18,
    textAlign: "center",
    paddingVertical: 12,
    marginTop: 24,
    backgroundColor: "#FFD76F",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 80,
  },
  estimateText: {
    color: "#C5C5C5",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
  },
});
