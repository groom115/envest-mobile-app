import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import images from "../../constants/images";
import PieChart from "react-native-pie-chart";
import RiskManagement from "../../components/PortfolioComponents/RiskManagement";
import ReturnCalculator from "../../components/PortfolioComponents/ReturnCalculateor";
import PeerComparison from "../../components/PortfolioComponents/PeerComparison";
import Rebalancing from "../../components/PortfolioComponents/Rebalancing";
import Investment from "../../components/PortfolioComponents/Investment";
import FundDetails from "../../components/PortfolioComponents/FundDetails";
import TaxImplication from "../../components/PortfolioComponents/TaxImplication";
import { useRouter } from "expo-router";
import { envestBackend } from "../../api";
import PriceGraph from "../../components/PortfolioComponents/PriceGraph";
import { ChartData, Portfolio } from "../../model/basket";
import { useLocalSearchParams } from "expo-router";

import {
  PORTFOLIO_BLUECHIP_SECTOR_ANALYSIS,
  PORTFOLIO_STABLE_FUND_ANALYSIS,
} from "../../constants/portfolioConstant";

const BlueChipScreen = () => {
  const [portfolioData, setPortfolioData] = useState<Portfolio | null>(null);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const { slug } = useLocalSearchParams();

  const fetchData = async () => {
    const response = await envestBackend.get(`/baskets/v1/${slug}`);
    const chartData = await envestBackend.get(`/baskets/v1/${slug}/chart`);
    const res = response.data;

    const chartDataFormat = Object.entries(chartData.data).map(
      ([date, value]) => ({ value, date })
    );
    setPortfolioData(res);
    setChartData(chartDataFormat as ChartData[]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const heading = () => {
    const router = useRouter();
    return (
      <View style={styles.heading}>
        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            activeOpacity={0.7}
          >
            <Image
              source={images.arrowLeft}
              alt="back"
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>

          <Text style={styles.welcome}>envest</Text>
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

  const priceGraph = () => {
    return chartData && <PriceGraph chartData={chartData} />;
  };
  const cryptoDistribution = () => {
    const items: string[] = [];
    const getDonutData: number[] = [];
    const constituents = portfolioData?.constituents;
    if (constituents) {
      constituents.forEach((cryptoItem) => {
        const name = cryptoItem.crypto.name;
        const weight = cryptoItem.weight;
        items.push(name);
        getDonutData.push(weight);
      });
    }
    const sliceColor = [
      "#FEEE7F",
      "#E93F8E",
      "#53E7CE",
      "#D2F25C",
      "#7681F7",
      "#F25C5C",
      "#FA8735",
    ];

    return (
      portfolioData !== null && (
        <View style={{ marginTop: 28, marginHorizontal: 16 }}>
          <Text style={styles.holdingText1}>Holdings & Analysis</Text>
          <Text style={styles.holdingText2}>Holdings (7)</Text>
          <View
            style={{
              marginTop: 15,
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginTop: 15,
            }}
          >
            {items.map((item: string, index: number) => {
              return (
                <View
                  key={item}
                  style={[
                    styles.holdingView1,
                    { borderLeftColor: sliceColor[index] },
                  ]}
                >
                  <Text style={styles.holdingText3}>{item}</Text>
                  <Text style={styles.holdingText3}>
                    {getDonutData[index]}%
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )
    );
  };

  const sectorHolding = () => {
    let holdingData;
    switch (slug) {
      case "bluechip-crypto-fund":
        holdingData = PORTFOLIO_BLUECHIP_SECTOR_ANALYSIS;
        break;
      case "stable-fund":
        holdingData = PORTFOLIO_STABLE_FUND_ANALYSIS;
        break;
      default:
        holdingData = PORTFOLIO_STABLE_FUND_ANALYSIS;
        break;
    }

    const getDonutData = holdingData.map((item) => item.amount);
    const sliceColor = ["#FEEE7F", "#E93F8E", "#53E7CE"];

    return (
      <View style={{ marginTop: 28, marginHorizontal: 16 }}>
        <Text style={styles.holdingText2}>Sectoral Allocation (3)</Text>

        <View
          style={{
            marginTop: 15,
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginTop: 15,
          }}
        >
          {holdingData.map((item: any, index: number) => {
            return (
              <View
                key={index}
                style={[
                  styles.holdingView1,
                  {
                    borderLeftColor: sliceColor[index],
                    alignItems: "center",
                    width: 156,
                  },
                ]}
              >
                <Text style={[styles.holdingText3, { width: 72 }]}>
                  {item.name}
                </Text>
                <Text style={styles.holdingText3}>{item.amount}%</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const portfolioContent = () => {
    let source, cagr;

    switch (slug) {
      case "bluechip-crypto-fund":
        source = images.blueChip;
        cagr = 37;
        break;
      case "stable-fund":
        source = images.stableFund;
        cagr = 30;
        break;
    }
    return (
      portfolioData && (
        <View style={{ marginTop: 26, marginHorizontal: 16 }}>
          <View style={styles.content}>
            <Image
              source={source}
              style={{ width: 48, height: 48 }}
              alt="blue"
            />
            <View>
              <Text style={styles.contentText1}>{portfolioData?.name}</Text>
              <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                <Text style={styles.contentText2}>
                  {portfolioData?.risk} risk{" "}
                </Text>
                <View
                  style={{
                    height: 4,
                    width: 4,
                    borderRadius: 2,
                    backgroundColor: "#979797",
                    alignSelf: "center",
                  }}
                ></View>
                <Text style={styles.contentText2}> Large cap</Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={styles.descText}>
              {portfolioData?.description.short}
            </Text>
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={styles.contentText3}>{cagr}%</Text>
            <Text style={styles.contentText4}>3Y CAGR</Text>
          </View>
        </View>
      )
    );
  };

  const returnAnalysis = () => {
    const [returns, setReturns] = useState<string>("annualized");

    return (
      <View style={{ marginTop: 28, marginHorizontal: 16 }}>
        <Text style={styles.analysisText1}>Return Analysis</Text>
        <View
          style={{ backgroundColor: "#343434", marginTop: 12, borderRadius: 5 }}
        >
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 12,
              marginRight: 4,
            }}
          >
            <TouchableOpacity
              style={[
                styles.analysisBut,
                {
                  backgroundColor:
                    returns === "annualized" ? "#FFF3D3" : "#474747",
                },
              ]}
              onPress={() => {
                setReturns("annualized");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.analysisText2,
                  { color: returns === "annualized" ? "#000000" : "#FFF3D3" },
                ]}
              >
                Annualized returns
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.analysisBut,
                {
                  backgroundColor:
                    returns === "absolute" ? "#FFF3D3" : "#474747",
                },
              ]}
              onPress={() => {
                setReturns("absolute");
              }}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.analysisText2,
                  { color: returns === "absolute" ? "#000000" : "#FFF3D3" },
                ]}
              >
                Absolute returns
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 20, paddingHorizontal: 8 }}>
            <View style={styles.analysisContainer}>
              <View style={styles.cell}>
                <Text style={styles.analysisText4}>Tenure:</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.cell}>
                  <Text style={styles.analysisText3}>6M</Text>
                </View>

                <View style={styles.cell}>
                  <Text style={styles.analysisText3}>1Y</Text>
                </View>

                <View style={styles.cell}>
                  <Text style={styles.analysisText3}>3Y</Text>
                </View>

                <View style={styles.cell}>
                  <Text style={styles.analysisText3}>All</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginVertical: 15,
                height: 1,
                borderRadius: 0.5,
                flex: 1,
                backgroundColor: "#979797",
              }}
            ></View>
            <View style={styles.analysisContainer}>
              <View style={styles.cell}>
                <Text style={styles.analysisText4}>Returns:</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.cell}>
                  {portfolioData !== null && returns === "absolute" ? (
                    <Text style={styles.analysisText3}>
                      {portfolioData?.returns?.absolute["6M"]}%
                    </Text>
                  ) : (
                    <Text style={styles.analysisText3}>
                      {portfolioData?.returns?.annualized["6M"]}%
                    </Text>
                  )}
                </View>

                <View style={styles.cell}>
                  {portfolioData !== null && returns === "absolute" ? (
                    <Text style={styles.analysisText3}>
                      {portfolioData?.returns?.absolute["1Y"]}%
                    </Text>
                  ) : (
                    <Text style={styles.analysisText3}>
                      {portfolioData?.returns?.annualized["1Y"]}%
                    </Text>
                  )}
                </View>

                <View style={styles.cell}>
                  {portfolioData !== null && returns === "absolute" ? (
                    <Text style={styles.analysisText3}>
                      {portfolioData?.returns?.absolute["3Y"]}%
                    </Text>
                  ) : (
                    <Text style={styles.analysisText3}>
                      {portfolioData?.returns?.annualized["3Y"]}%
                    </Text>
                  )}
                </View>

                <View style={styles.cell}>
                  {portfolioData !== null && returns === "absolute" ? (
                    <Text style={styles.analysisText3}>
                      {portfolioData?.returns?.absolute["All"]}%
                    </Text>
                  ) : (
                    <Text style={styles.analysisText3}>
                      {portfolioData?.returns?.annualized["All"]}%
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const returnCalculator = () => {
    return <ReturnCalculator data={portfolioData?.returns?.absolute} />;
  };
  const togglePoints = () => {
    return (
      <View style={{ marginTop: 30, marginBottom: 60 }}>
        <PeerComparison
          openIcon={images.openDropDown}
          closeIcon={images.closeDropDown}
          slug={slug as string}
        />

        <RiskManagement
          openIcon={images.openDropDown}
          closeIcon={images.closeDropDown}
          documentText={images.documentText}
        />
        <Rebalancing
          openIcon={images.openDropDown}
          closeIcon={images.closeDropDown}
          documentText={images.documentText}
        />
        <Investment
          openIcon={images.openDropDown}
          closeIcon={images.closeDropDown}
        />
        <FundDetails
          openIcon={images.openDropDown}
          closeIcon={images.closeDropDown}
        />
        <TaxImplication
          openIcon={images.openDropDown}
          closeIcon={images.closeDropDown}
        />
      </View>
    );
  };
  const tabButtons = () => {
    return (
      <View style={styles.tab}>
        <TouchableOpacity style={styles.tabBut}>
          <Text style={styles.tabText}>One-time</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBut2}>
          <Text style={styles.tabText2}>Start SIP</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ScrollView style={styles.container}>
        <View>
          {heading()}
          {portfolioContent()}
          {priceGraph()}
          {cryptoDistribution()}
          {sectorHolding()}
          {returnAnalysis()}
          {returnCalculator()}
          {togglePoints()}
        </View>
      </ScrollView>
      {tabButtons()}
    </View>
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
    color: "#FFD76F",
    fontWeight: "600",
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
  content: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  contentText1: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
  },
  contentText2: {
    color: "#979797",
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 13,
  },
  descText: {
    color: "white",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
  },
  contentText3: {
    color: "#28FFA4",
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 30,
  },
  contentText4: {
    color: "#979797",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
  },
  holdingText1: {
    color: "#FFD76F",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
  },
  holdingText2: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
    marginTop: 8,
  },
  holdingText3: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
  },
  holdingView1: {
    backgroundColor: "#343434",
    borderRadius: 10,
    borderLeftWidth: 7,
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: 148,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    marginTop: 12,
  },
  analysisText1: {
    color: "#FFD76F",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
  },
  analysisText2: {
    color: "#FFF3D3",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
  },
  analysisText4: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
  },
  analysisText3: {
    color: "#979797",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 13,
    // flex: 1,
  },
  analysisContainer: {
    flexDirection: "row",
    gap: 30,
  },
  cell: {
    width: 56,
    // textAlign: "center",
    // alignItems: "center",
  },
  analysisBut: {
    paddingHorizontal: 13,
    borderRadius: 6,
    paddingVertical: 2,
  },
  tab: {
    width: "100%",
    position: "absolute",
    paddingHorizontal: 16,
    paddingVertical: 13,
    backgroundColor: "#141414",
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 0,
  },
  tabBut: {
    borderRadius: 8,
    borderColor: "#FFD76F",
    borderWidth: 1,
    paddingHorizontal: 48,
    paddingVertical: 13,
  },
  tabBut2: {
    borderRadius: 8,
    borderColor: "#FFD76F",
    borderWidth: 1,
    paddingHorizontal: 48,
    paddingVertical: 13,
    backgroundColor: "#FFD76F",
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
});

export default BlueChipScreen;
