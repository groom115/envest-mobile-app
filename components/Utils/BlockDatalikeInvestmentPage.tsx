import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text, View } from "../Themed";
import images from "../../constants/images";

interface dataProps{
    basketClicked: boolean,
    date: string,
    fundName:string,
    amountInvestedInFund: number,
    completed: string
}

const BlockDatalikeInvestmentPage = ({ basketClicked, date, fundName, amountInvestedInFund, completed} : dataProps) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ fontSize: 10, fontWeight: "200"}}>{date}</Text>
                <View style={styles.fund}>
                    <Text style={styles.fundStyle}>{fundName}</Text>
                    <Text style={styles.fundStyle}>₹ {amountInvestedInFund}</Text>
                </View>
                <View style={styles.fund}>
                    <Text style={{ fontSize: 10, fontWeight: "200"}}>New SIP/SIP Instalment/ One-time/ Sell</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <View style={completed == 'Completed' ? styles.greenDot : completed == 'Pending' ? styles.yellowDot : styles.redDot} />
                        <Text style={{ fontSize: 10, fontWeight: "300"}}>
                            {completed}
                        </Text>
                        {!basketClicked ? (
                          <Image
                                source={images.whiteRightArrow}
                                style={{ tintColor: "#808080", width: 7, height: 12, marginLeft: 5, }}
                                alt="help"
                           />
                        ):(
                            <Image
                                source={images.downArrow}
                                style={{ marginLeft: 5}}
                                alt="downArrow"
                           />
                        )}
                    </View>
                </View>
            </View>
            {!basketClicked ? (
            <View style={styles.line} ></View>
            ): (
                <View style={{marginTop: 10}} ></View>
            )}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        marginBottom: 4,
        marginLeft: 16
    },
    fund:{
        flexDirection:"row",
        justifyContent: 'space-between',
        marginTop: 10,
        marginRight: 16
    },
    fundStyle:{
        fontSize: 14,
        fontWeight: "400",
    },
    greenDot: {
        width: 8,
        height: 8,
        borderRadius: 5,
        marginRight: 3,
        backgroundColor: '#28FFA4',
      },
    yellowDot: {
        width: 8,
        height: 8,
        borderRadius: 5,
        marginRight: 3,
        backgroundColor: '#FFD76F',
    },
    redDot: {
        width: 8,
        height: 8,
        borderRadius: 5,
        marginRight: 3,
        backgroundColor: '#F23753',
    },
    line: {
        borderBottomColor: "#979797",
        borderBottomWidth: 0.5,
        width: "100%",
        alignSelf: "center",
        marginTop: 10
    },
})
export default BlockDatalikeInvestmentPage;