import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import images from "../../constants/images";
import { useRouter } from "expo-router";
import PieChart from "react-native-pie-chart";
import InvestmentModel from "../../components/HomeScreenComponents/InvestmentModel";
import PortfolioSelect from "../../components/HomeScreenComponents/PortfolioSelect";
import TenureSelect from "../../components/HomeScreenComponents/TenureSelect";
import InvestmentInput from "../../components/HomeScreenComponents/InvestmentInput";
import { envestBackend } from "../../api";
import { Portfolio } from "../../model/basket";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../global/store";
import { useQuery } from "@tanstack/react-query";
import { getInrWalletBalance } from "../../services/wallet.service";
import { setWallet } from "../../global/slices/wallet";

interface AppProps {}

const BasketsScreen: React.FC<AppProps> = () => {
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
  const [baskets, setBaskets] = useState<any>(null);

  const { name: customerName, userId } = useSelector(
    (state: RootState) => state.profile
  );

  const sliceColor = ["#D0FFEB", "#28FFA4"];
  const router = useRouter();
  const fetchData = async () => {
    const list = await envestBackend.get(`/baskets/v1/list`);
    setBaskets(list.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const dispatch = useDispatch();

  const { data: inrBalance, isSuccess } = useQuery({
    queryKey: ["inr-balance"],
    queryFn: () => getInrWalletBalance(userId),
  });

  if (isSuccess) {
    dispatch(
      setWallet({
        inrBalance: inrBalance,
      })
    );
  }

  const header = () => {
    return (
      <View style={styles.heading}>
        <Text style={styles.welcome}>
          Welcome, <Text style={{ color: "#FFD76F" }}>{customerName}!</Text>{" "}
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

  const kycSetUp = () => {
    return (
      <View style={{ marginTop: 28 }}>
        {separater("Complete KYC in under", "120 seconds")}
        <View style={styles.kycBox}>
          <Image
            source={images.money}
            style={{ height: 60, width: 60, alignSelf: "center" }}
          />
          <View style={styles.textBox}>
            <Text style={styles.kycText}>
              Refer your friends & family and earn 100% of their commission.
            </Text>
            <TouchableOpacity
              style={styles.setupBut}
              onPress={() => router.push("/refer")}
              activeOpacity={1}
            >
              <Text style={styles.setupText}>Start Earning</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const portfolioType = (
    title: string,
    slug: string,
    returns: string,
    key: number
  ) => {
    let source;

    switch (slug) {
      case "bluechip-crypto-fund":
        source = images.blueChip;
        break;
      case "stable-fund":
        source = images.stableFund;
        break;
      default:
        break;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          router.push(`/basket/${slug}`);
        }}
        style={styles.fund}
        activeOpacity={1}
        key={key}
      >
        <Image
          source={source}
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

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                marginTop: 25,
              }}
            >
              <Text style={styles.fundText3}>
                Start SIP with <Text style={{ fontWeight: "700" }}>₹50</Text>{" "}
              </Text>

              <Image
                source={images.rightIcon}
                style={{ width: 12, height: 12 }}
                alt="icon"
              />
            </View>
          </View>
          <View>
            <Text style={styles.fundText1}>{returns}</Text>
            <Text style={styles.fundText2}>3Y Returns</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const portfolio = () => {
    return (
      baskets !== null && (
        <View style={{ marginTop: 40 }}>
          {separater("Begin your crypto journey with just ", "₹50")}

          {baskets.map((item: Portfolio, index: number) => {
            return portfolioType(
              item.name,
              item.slug,
              item.returns.absolute["3Y"],
              index
            );
          })}
        </View>
      )
    );
  };
  const supportOptions = (
    title: string,
    sub: string,
    icon: any,
    iconWidth: number
  ) => {
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

  const envestSupport = () => {
    return (
      <View style={{ marginTop: 40 }}>
        {separater("Why choose ", "envest?")}
        <View style={styles.options}>
          {supportOptions("No ", "Lock-in", images.lock, 24)}
          {supportOptions("Fast ", "deposits", images.upiIcon, 49)}
          {supportOptions("24x7 ", "Support", images.headset, 24)}
        </View>
      </View>
    );
  };

  const returnCalculator = () => {
    return (
      <View>
        <View style={{ marginTop: 40 }}>
          {seperaterOp("Returns", "you would have generated")}

          <InvestmentModel
            getInvestmentModel={getInvestmentModel}
            setInvestmentModel={setInvestmentModel}
          />
        </View>

        <InvestmentInput amount={amount} setAmount={setAmount} />
        <View style={{ marginTop: 24 }}>
          <PortfolioSelect
            getStockType={getStockType}
            setStockType={setStockType}
          />
        </View>
        <View style={{ marginTop: 24 }}>
          <TenureSelect selectedTenure={selectedTenure} setTenure={setTenure} />
        </View>
      </View>
    );
  };

  const returnDetails = () => {
    return (
      <View style={{ marginTop: 34, marginHorizontal: 18 }}>
        <Text style={styles.calcText}>
          Your investment of{" "}
          <Text style={{ color: "#FFD76F", fontWeight: "600" }}>
            ₹ {getInvestedMoney}{" "}
          </Text>{" "}
        </Text>
        <Text style={styles.calcText}>
          Over a{" "}
          <Text style={{ color: "#FFD76F", fontWeight: "600" }}>
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
          <Text style={{ color: "#FFD76F", fontWeight: "600" }}>
            {" "}
            ₹ {getRetuns.toFixed(2)}
          </Text>{" "}
        </Text>
      </View>
    );
  };

  const chart = () => {
    return (
      <View>
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
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        {header()}
        {kycSetUp()}
        {portfolio()}
        {envestSupport()}
        {returnCalculator()}
        {returnDetails()}
        {chart()}
        <TouchableOpacity style={styles.invBut}>
          <Text style={styles.butText}>Start Investing</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
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
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 24,
  },
  help: {
    color: "#FFF3D3",
    fontWeight: "500",
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
    fontWeight: "500",
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
    backgroundColor: "#343434",
    display: "flex",
    flexDirection: "row",
    padding: 16,
    borderRadius: 5,
  },
  kycText: {
    color: "#FFFFFF",
    fontWeight: "600",
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
    fontWeight: "500",
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
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 17,
  },
  fundText1: {
    color: "#28FFA4",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 17,
  },
  fundText2: {
    color: "#979797",
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 13,
  },
  fundText3: {
    color: "#FFFFFF",
    fontWeight: "500",
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
    fontWeight: "600",
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

export default BasketsScreen;
