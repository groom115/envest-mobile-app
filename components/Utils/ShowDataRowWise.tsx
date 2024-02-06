import React from "react"
import { View } from "../Themed"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
interface dataProps{
    data: any
}
const ShowDataRowWise = ({data}: dataProps) => {
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
export default ShowDataRowWise;
const styles = StyleSheet.create({
container:{
    flexDirection: 'column',
    marginTop: 6,
    marginRight: 16,
},
textForDisplay: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
}
})