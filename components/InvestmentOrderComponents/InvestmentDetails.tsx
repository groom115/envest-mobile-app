import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../Themed';
import InvestmentOrderRowWiseData from './InvestmentOrderRowWiseData';
import images from '../../constants/images';
import HoldingInvestmentData from './HoldingInvestmentData';
import { chargesProp, dataPropsOfDetailsToShowInKeyValue, detailsProp, holdingProp } from '../../model/transaction';

const InvestmentDetails = ({detailsName,value}: dataPropsOfDetailsToShowInKeyValue) => {
    const [details, setDetails] = useState(false);
    const [holdings, setHoldings] = useState(false);
    const [charges, setCharges] = useState(false);
    const [valueForDetails, setValueForDetails] = useState<detailsProp>();
    const [valueForHolding, setValueForHolding] = useState<holdingProp>();
    const [valueForCharges, setValueForCharges] = useState<chargesProp>();
    const dateAndTime = (date: string) => {
        let dateOfMonth = date.slice(8,10);
        let monthOnNumber = Number(date.slice(5,7));
        let year = date.slice(0,4);
        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return dateOfMonth+" "+month[monthOnNumber-1]+" "+year+" | "+date.slice(11,19);
      }
    
    const detailsToShow = (valueClicked: string) => {
        switch(valueClicked){
            case "Details":
                const detailsData = {
                    'Order ID' : value?.orderId,
                    'Order Status' : value?.completeOrderStatus == 'FULFILLED' ? 'Completed' : value?.completeOrderStatus == 'INITIATED' ? 'Pending' : 'Failed',
                    'Portfolio ID' : value?.portfolioId,
                    'Order Type' : value?.currentStatus,
                    'Time and Date' : dateAndTime(value?.createdAt)
            }
                setValueForDetails(detailsData)
                return setDetails(!details);
            case "Holdings":
                const holdingData:any = {
                    'Coins': [],
                    'Avg. Buy Price': [],
                    'Units': []
                }
                for (let index = 0; index < value.constituents.length; index++) {
                    holdingData['Coins'].push(`${value.constituents[index].instrument}`);
                    holdingData["Avg. Buy Price"].push(`${value.constituents[index].unitsBought * value.constituents[index].weight}`);
                    holdingData["Units"].push(`${value.constituents[index].unitsBought}`);
                }
                setValueForHolding(holdingData)
                return setHoldings(!holdings);
            case "Charges":
                const chargesData = {
                    'Expense Ratio (deducted on rebalance)' : '-',
                    'TDS (applicable only on sell orders)' : value?.fees?.tds,
                    'Taker + Maker fee' : value?.fees?.makerFee + value?.fees?.takerFee,
                    'Order Amount' : value?.amount
                }
                setValueForCharges(chargesData)
                return setCharges(!charges);
        }
    }



    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => detailsToShow(detailsName)}>
            <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
            <Text style={styles.textHeading}>{detailsName}</Text>
                    {detailsName == "Details" && (
                        <Image
                          source={images.downArrow}
                          style={{
                            tintColor: "#FFFFFF",
                            margin: 5,
                            marginRight: 20,
                            transform:[{ rotate: details ? '180deg' : '0deg' }] ,
                          }}
                          alt="help"
                        />
                        )}
                        {detailsName == "Holdings" && (
                        <Image
                          source={images.downArrow}
                          style={{
                            tintColor: "#FFFFFF",
                            margin: 5,
                            marginRight: 20,
                            transform:[{ rotate: holdings ? '180deg' : '0deg' }] ,
                          }}
                          alt="downArrow"
                        />
                        )}
                        {detailsName == "Charges" && (
                        <Image
                          source={images.downArrow}
                          style={{
                            tintColor: "#FFFFFF",
                            margin: 5,
                            marginRight: 20,
                            transform:[{ rotate: charges ? '180deg' : '0deg' }] ,
                          }}
                          alt="upArrow"
                        />
                        )}
                        </View>
        </TouchableOpacity>
        {details && (
            <InvestmentOrderRowWiseData data={valueForDetails} />
        )}
        {holdings && (
            <HoldingInvestmentData data={valueForHolding} />
            )}
        {charges && (
            <InvestmentOrderRowWiseData data={valueForCharges} />
        )}
        </View>
    )
}
export default InvestmentDetails;
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 16,
        marginBottom: 10
    },
    textHeading: {
        fontSize: 14,
        fontWeight: "400",
        width:80,
        height:18
    }
})