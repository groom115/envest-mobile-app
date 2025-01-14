import {
    StyleSheet,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import InvestmentOrderList from "../../../components/InvestmentOrderComponents/InvestmentOrderList";
  import InvestmentDetails from "../../../components/InvestmentOrderComponents/InvestmentDetails";
  import InvestmentServices from "../../../services/investment.service";
  import { transactionsData } from "../../../model/transaction";
import { Text, View } from "../../../components/Themed";
import GenericHeader from "../../../components/GenericComponents/GenericHeader";
  
  interface AppProps {}
  
  const InvestmentOrdersScreen: React.FC<AppProps> = () => {
    const [basketClicked, setBasketClicked] = useState(false);
    const [fundNameGotClicked, setFundNameGotClicked] = useState<any>();
    const [details, setDetails] = useState<transactionsData | null>(null);
    const [keyForRenderItems, setKeyForRenderItems] = useState<string>("");
    const investmentBasket = ["Blue-Chip Crypto Fund", "Stable Fund"];
    const investmentBasketTypeOfData = ["Details", "Holdings", "Charges"];
  
    let basketName: string = "";
    const fundnameOfBasket = (portfolioId: string) => {
      switch (portfolioId) {
        case "e32":
          return "Blue-Chip Crypto Fund";
        case "e31":
          return (basketName = "Stable Fund");
        case "e33":
          return (basketName = "test-portfolio");
        default:
          throw new Error("Invalid PortfolioId");
      }
    };
  
    const completedStatus = (status: string) => {
      switch (status) {
        case "FULFILLED":
          return "Completed";
        case "INITIATED":
          return "Pending";
        case "FAILED":
          return "Failed";
        default:
          throw new Error("Invalid Status");
      }
    };
  
    const portfolioBoughtDate = (date: string) => {
      let dateOfMonth = date.slice(8, 10);
      let monthOnNumber = Number(date.slice(5, 7));
      let year = date.slice(0, 4);
      let month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      return dateOfMonth + " " + month[monthOnNumber - 1] + " " + year;
    };
  
    const handleBasketPressed = (itemClicked: any) => {
      setFundNameGotClicked(itemClicked);
      setKeyForRenderItems(itemClicked.orderId);
      setBasketClicked(!basketClicked);
    };
  
    useEffect(() => {
      const getDataOfAllInvestment = async () => {
        const getAllInvestmentDetails = InvestmentServices.getAllInvestments();
  
        setDetails(await getAllInvestmentDetails);
      };
      getDataOfAllInvestment();
    }, []);
    return (
      <View style={styles.container}>
        <GenericHeader showLogo/>
        <View>
          <Text style={styles.order}>
            {!basketClicked ? "All Investment Orders" : "Order Details"}
          </Text>
        </View>
        <View style={{ marginTop: 40, backgroundColor: "#000000" }}>
          <View style={styles.line}></View>
          {!basketClicked ? (
            <>
              {details?.transactions && (
                <FlatList
                  data={details.transactions}
                  renderItem={({ item, index }: any) => (
                    <TouchableOpacity onPress={() => handleBasketPressed(item)}>
                      <InvestmentOrderList
                        basketClicked={basketClicked}
                        key={item.orderId}
                        date={portfolioBoughtDate(item.createdAt)}
                        fundName={fundnameOfBasket(item.portfolioId)}
                        amountInvestedInFund={item.investedAmount}
                        completed={completedStatus(item.completeOrderStatus)}
                      />
                    </TouchableOpacity>
                  )}
                />
              )}
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => setBasketClicked(!basketClicked)}>
                <InvestmentOrderList
                  basketClicked={basketClicked}
                  key={keyForRenderItems}
                  date={portfolioBoughtDate(fundNameGotClicked.createdAt)}
                  fundName={fundnameOfBasket(fundNameGotClicked.portfolioId)}
                  amountInvestedInFund={fundNameGotClicked.investedAmount}
                  completed={completedStatus(
                    fundNameGotClicked.completeOrderStatus
                  )}
                />
              </TouchableOpacity>
              <View style={styles.line}></View>
              {fundNameGotClicked &&
                investmentBasketTypeOfData.map((item, index) => (
                  <React.Fragment key={index}>
                    <InvestmentDetails
                      detailsName={item}
                      value={fundNameGotClicked}
                    />
                    <View style={styles.line}></View>
                  </React.Fragment>
                ))}
            </>
          )}
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
      flex: 1,
    },
    heading: {
      flexDirection: "row",
      justifyContent: "space-between",
      display: "flex",
      marginTop: 58,
      marginLeft: 16,
      marginRight: 16,
    },
    help: {
      color: "#FFF3D3",
      fontWeight: "500",
      fontSize: 14,
      lineHeight: 20,
      marginLeft: 10,
    },
    order: {
      flexDirection: "row",
      justifyContent: "space-between",
      display: "flex",
      marginTop: 40,
      fontSize: 20,
      fontWeight: "400",
      marginLeft: 16,
      marginRight: 16,
      backgroundColor: "#000000",
      color: "#FFFFFF"
    },
    line: {
      borderBottomColor: "#979797",
      borderBottomWidth: 0.5,
      width: "100%",
      alignSelf: "center",
    },
    break: {
      marginLeft: 16,
      display: "flex",
      flexDirection: "row",
    },
  });
  
  export default InvestmentOrdersScreen;
  