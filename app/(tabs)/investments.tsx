import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import images from "../../constants/images";
  import { useRouter } from "expo-router";
  import InvestmentServices from "../../services/investment.service";
  import { useSelector } from "react-redux";
  import { RootState } from "../../global/store";
  import {
    InvestmentConstituents,
    InvestmentOverview,
  } from "../../model/investment";
  import { Sip, SipList } from "../../model/sip";
  import SipServices from "../../services/sip.service";
  import GenericHeader from "../../components/GenericComponents/GenericHeader";
  
  export default function InvestmentsScreen() {
    const router = useRouter();
    const [holdings, SetHoldings] = useState<boolean>(true);
  
    const [personalInvestments, setPersonalInvestments] =
      useState<InvestmentOverview | null>(null);
    const [sipList, setSipList] = useState<SipList | null>(null);
    const [currentHoldingsCount, setCurrentHoldingsCount] = useState<number>(0);
  
    const { userId } = useSelector((state: RootState) => state.profile);
  
    const fetchData = async () => {
      const getInvestmentsResponse = await InvestmentServices.getPersonalInvestmentOverview(userId);
      setPersonalInvestments(getInvestmentsResponse);
      if(getInvestmentsResponse?.e31.investedAmount!==undefined && getInvestmentsResponse.e31.investedAmount>0){
        setCurrentHoldingsCount(prev=>prev+1);
      }
      if(getInvestmentsResponse?.e32.investedAmount!==undefined && getInvestmentsResponse.e32.investedAmount>0){
        setCurrentHoldingsCount(prev=>prev+1);
      }
      const getSipsResponse = await SipServices.getAllSips(userId);
      setSipList(getSipsResponse);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const investment = () => {
      let gains: number = 0;
      if (personalInvestments !== null && personalInvestments !== undefined) {
        const totalCurrentAmount = personalInvestments.totalCurrentAmount ?? 0;
        const totalInvestedAmount = personalInvestments.totalInvestedAmount ?? 0;
        gains = Number((totalCurrentAmount - totalInvestedAmount).toFixed(2));
      }
  
      return (
        personalInvestments && (
          <View style={styles.invContainer}>
            <Text style={styles.invText}>My Investments</Text>
            <View style={styles.invDetails}>
              <View style={styles.invAlign}>
                <Text style={styles.invText1}>Current Value</Text>
                <Text style={styles.invText2}>
                  ₹ {personalInvestments?.totalCurrentAmount.toFixed(2)}
                </Text>
              </View>
              <View style={styles.invAlign}>
                <Text style={styles.invText1}>Invested Value</Text>
                <Text style={styles.invText2}>
                  ₹ {personalInvestments?.totalInvestedAmount.toFixed(2)}
                </Text>
              </View>
              <View style={styles.invAlign}>
                <Text style={styles.invText1}>Total Gains</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={[
                      styles.invText3,
                      { color: gains > 0 ? "#28FFA4" : "red" },
                    ]}
                  >
                    ₹{" "}
                    {(
                      personalInvestments?.totalCurrentAmount -
                      personalInvestments?.totalInvestedAmount
                    ).toFixed(2)}
                  </Text>
                  <Text
                    style={[
                      styles.invText4,
                      { color: gains > 0 ? "#28FFA4" : "red" },
                    ]}
                  >
                    {" "}
                    (
                    {(gains / personalInvestments?.totalInvestedAmount).toFixed(
                      2
                    )}
                    %)
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )
      );
    };
  
    const buttons = () => (
      <View style={styles.butContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: holdings ? "#FFF3D3" : "#1e1e1e" },
          ]}
          activeOpacity={1}
          onPress={() => {
            SetHoldings(true);
          }}
        >
          <Text
            style={[styles.butText, { color: holdings ? "#1e1e1e" : "#FFF3D3" }]}
          >
            Current Holdings ({currentHoldingsCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: !holdings ? "#FFF3D3" : "#000000" },
          ]}
          activeOpacity={1}
          onPress={() => {
            SetHoldings(false);
          }}
        >
          <Text
            style={[styles.butText, { color: !holdings ? "#000000" : "#FFF3D3" }]}
          >
            SIPs ({sipList?.data.length})
          </Text>
        </TouchableOpacity>
      </View>
    );
  
    const currentHoldingDetails = (
      basket: string,
      investment: InvestmentConstituents
    ) => (
      <TouchableOpacity
        style={styles.order}
        activeOpacity={1}
        onPress={() => {
          router.push({
            pathname: "/holding-details",
            params: { investment: JSON.stringify(investment), basket },
          });
        }}
      >
        <View style={{ gap: 8, alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.orderText2}>{basket}</Text>
        </View>
        <View style={{ gap: 8, alignItems: "flex-start" }}>
          <Text style={styles.orderText1}>Invested (Current)</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.orderText4}>
              {investment.investedAmount.toFixed(2)}
            </Text>
            <Text style={styles.orderText3}>
              {" "}
              ({investment.currentAmount.toFixed(2)})
            </Text>
          </View>
        </View>
        <Image
          source={images.rightIcon}
          style={{ width: 16, height: 16, alignSelf: "center" }}
        />
      </TouchableOpacity>
    );
    const sipDetails = (sip: Sip, index: number) => {
      const basket =
        sip.portfolioId === "e31"
          ? "Stable-Fund Crypto Basket"
          : "Blue-Chip Crypto Basket";
      const currentDate = new Date();
      const sipDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        sip.sipSchedule
      );
  
      let date = "";
      if (currentDate > sipDate) {
        const nextMonth =
          currentDate.getMonth() === 11 ? 0 : currentDate.getMonth() + 1;
        const year =
          nextMonth === 0
            ? currentDate.getFullYear() + 1
            : currentDate.getFullYear();
        date = `${sip.sipSchedule} ${new Date(year, nextMonth).toLocaleString(
          "default",
          { month: "short" }
        )}`;
      } else {
        date = `${sip.sipSchedule} ${currentDate.toLocaleString("default", {
          month: "short",
        })}`;
      }
      return (
        <TouchableOpacity
          style={styles.order}
          onPress={() => {
            router.push({
              pathname: "/sip-details",
              params: { sip: JSON.stringify(sip), basket },
            });
          }}
          activeOpacity={1}
          key={index}
        >
          <View style={{ gap: 8, alignItems: "flex-start" }}>
            <Text style={styles.orderText1}>Next due on {date}</Text>
            <Text style={styles.orderText2}>{basket}</Text>
          </View>
          <View style={{ gap: 8, alignItems: "flex-start" }}>
            <Text style={styles.orderText1}>SIP Amount</Text>
            <Text style={styles.orderText4}>₹ {sip.amount}</Text>
          </View>
          <Image
            source={images.rightIcon}
            style={{ width: 16, height: 16, alignSelf: "center" }}
          />
        </TouchableOpacity>
      );
    };
  
    const orders = () => (
      <View style={styles.ordersContainer}>
        {holdings
          ? personalInvestments && (
              <>
                {currentHoldingDetails(
                  "Stable-Fund Crypto Basket",
                  personalInvestments?.e31
                )}
                {currentHoldingDetails(
                  "Blue-Chip Crypto Basket",
                  personalInvestments?.e32
                )}
              </>
            )
          : sipList && (
              <>
                {sipList.data.map((sip: Sip, index: number) =>
                  sipDetails(sip, index)
                )}
              </>
            )}
      </View>
    );
    return (
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 16 }}>
          <GenericHeader showLogo={false} />
        </View>
        {personalInvestments && investment()}
        {buttons()}
        <ScrollView>{orders()}</ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#1E1E1E",
      paddingTop: 10,
      flex: 1,
    },
    invContainer: {
      marginTop: 28,
      paddingHorizontal: 16,
    },
    invText: {
      color: "#FFFFFF",
      fontWeight: "500",
      fontSize: 20,
      lineHeight: 25,
    },
    invDetails: {
      borderWidth: 1,
      borderColor: "#FFD76F",
      borderRadius: 5,
      marginTop: 16,
      paddingHorizontal: 12,
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    invText1: {
      color: "#FFFFFF",
      fontWeight: "400",
      fontSize: 12,
      lineHeight: 15,
    },
    invText2: {
      color: "#FFFFFF",
      fontWeight: "500",
      fontSize: 14,
      lineHeight: 17,
    },
    invText3: {
      fontWeight: "500",
      fontSize: 14,
      lineHeight: 17,
      alignSelf: "center",
    },
    invText4: {
      fontWeight: "400",
      fontSize: 10,
      lineHeight: 12,
    },
    invAlign: {
      alignItems: "flex-start",
      gap: 16,
    },
    butContainer: {
      flexDirection: "row",
      gap: 20,
      paddingHorizontal: 16,
      marginTop: 28,
    },
    button: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#FFF3D3",
      paddingVertical: 8,
      paddingHorizontal: 11,
    },
    butText: {
      fontWeight: "600",
      fontSize: 14,
      lineHeight: 17,
    },
    ordersContainer: {
      borderTopWidth: 0.5,
      borderTopColor: "#979797",
      marginTop: 28,
    },
    orderText1: {
      color: "#979797",
      fontWeight: "400",
      fontSize: 10,
      lineHeight: 12,
    },
    orderText2: {
      color: "#FFFFFF",
      fontWeight: "500",
      fontSize: 14,
      lineHeight: 17,
    },
    orderText3: {
      color: "#28FFA4",
      fontWeight: "500",
      fontSize: 12,
      lineHeight: 15,
    },
    orderText4: {
      color: "#FFFFFF",
      fontWeight: "500",
      fontSize: 12,
      lineHeight: 15,
    },
    order: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 0.5,
      borderBottomColor: "#979797",
    },
  });
  