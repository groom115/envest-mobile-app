import React from "react"
import { View } from "../Themed"
import { Text, StyleSheet } from "react-native"
interface dataProps{
    data: any
}
const InvestmentOrderRowWiseData = ({data}: dataProps) => {
    return (
        <View style={styles.container}>
            {Object.keys(data).map((key, index)=>(
                <View key={index} style={styles.textForDisplay}>
                <Text style={{fontSize:12, fontWeight:"400" ,width:80 ,height:14, color: 'white'}}>{key}</Text>
                <Text style={{fontSize:12, color: 'white'}}>{data[key]}</Text>
            </View>
        ))}
    </View>
)
}
export default InvestmentOrderRowWiseData;
const styles = StyleSheet.create({
container:{
    flexDirection: 'column',
    marginTop: 6,
    marginRight: 16,
    backgroundColor: "#000000"
},
textForDisplay: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#000000",
    color: "#FFFFFF"
}
})