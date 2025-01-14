import React from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
interface dataProps{
    data: any
}
const HoldingInvestmentData = ({data}: dataProps) => {
    const columns = Object.keys(data);
    const renderItem = ({ item }: any) => (
      <View style={styles.column}>
        {data[item].map((value: any, index: any) => (
            <View key={index} style={[styles.cell, {marginBottom: 5}]}>
            <Text style={styles.textDisplay}>{value}</Text>
          </View>
        ))}
      </View>
    );
  
    return (<>
        <View style={[styles.row, {marginTop: 10, marginBottom: 5, marginRight: 16, backgroundColor: "#000000"}]}>
        {Object.entries(data).map(([label, values], index) => (
            <Text key={index} style={{ fontSize: 13, color:'#FFFFFF', fontWeight:'500'}}>{label}</Text>
        ))}
        </View>
      <FlatList
        data={columns}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        horizontal
      />
      </>
    );
  };
  
  const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    column: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: "#000000"
    },
    cell: {
      justifyContent: 'space-between',
      marginRight: 50,
      backgroundColor: "#000000"
    },
    textDisplay: {
      fontSize:12, fontWeight:"400" ,width:80 ,height:14, color: '#FFFFFF'
    }
  });
export default HoldingInvestmentData