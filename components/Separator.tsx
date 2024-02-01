import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface SeparatorProps {
    color?: string;
    margin?: number;
}

const Separator: React.FC<SeparatorProps> = ({color = "#979797", margin = 0}) => {
  return (
    <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 0.2,
          marginHorizontal: margin,
        }}
      ></View>
  )
}

export default Separator

const styles = StyleSheet.create({})