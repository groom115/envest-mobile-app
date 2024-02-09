import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { ChartData } from "../../model/basket";

interface AppProps {
  chartData: ChartData[];
}

const PriceGraph = ({ chartData }: AppProps) => {
  const [tenure, setTenure] = useState<string>("1W");
  const [lineChartData, setLineChartData] = useState<any>(
    chartData.slice(Math.max(chartData.length - 7, 0))
  );
  const [getChartData, setChartData] = useState<any>(null);
  const { width: SIZE } = Dimensions.get("window");

  const handleTimePeriodChange = () => {
    let updatedData = [];
    let length = getChartData.length;
    switch (tenure) {
      case "1W":
        updatedData = getChartData.slice(Math.max(length - 7, 0));

        break;
      case "1M":
        updatedData = getChartData.slice(Math.max(length - 30, 0));

        break;
      case "6M":
        updatedData = getChartData.slice(Math.max(length - 180, 0));

        break;
      case "1Y":
        updatedData = getChartData.slice(Math.max(length - 365, 0));

        break;
      case "3Y":
        updatedData = getChartData.slice(Math.max(length - 900, 0));

        break;

      default:
        break;
    }

    setLineChartData(updatedData);
  };

  useEffect(() => {
    setChartData(chartData);
    if (getChartData) handleTimePeriodChange();
  }, [tenure, chartData]);

  return (
    chartData && (
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            marginHorizontal: 12,
            alignItems: "center",
          }}
        >
          {chartData && (
            <LineChart
              areaChart
              data={lineChartData}
              rotateLabel={false}
              hideDataPoints
              width={SIZE - 34}
              isAnimated
              onDataChangeAnimationDuration={800}
              adjustToWidth
              color="#00ff83"
              thickness={2}
              startFillColor="rgba(20,105,81,0.3)"
              endFillColor="rgba(20,85,81,0.01)"
              startOpacity={0.9}
              endOpacity={0.2}
              initialSpacing={0}
              noOfSections={1}
              hideRules
              hideYAxisText
              pointerConfig={{
                pointerStripHeight: 160,
                pointerStripColor: "lightgray",
                pointerStripWidth: 2,
                pointerColor: "lightgray",
                radius: 6,
                pointerLabelWidth: 100,
                pointerLabelHeight: 90,
                barTouchable: true,
                autoAdjustPointerLabelPosition: false,

                pointerLabelComponent: (items: any) => {
                  return (
                    <View
                      style={{
                        height: 90,
                        width: 100,
                        justifyContent: "center",
                        marginTop: -30,
                        marginLeft: -40,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                          marginBottom: 6,
                          textAlign: "center",
                        }}
                      >
                        {items[0].date}
                      </Text>

                      <View
                        style={{
                          paddingHorizontal: 14,
                          paddingVertical: 6,
                          borderRadius: 16,
                          backgroundColor: "white",
                        }}
                      >
                        <Text
                          style={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          {items[0].value}
                        </Text>
                      </View>
                    </View>
                  );
                },
              }}
            />
          )}
          <View style={styles.separatorLine}></View>
        </View>
        <View style={styles.periodContainer}>
          <TouchableOpacity
            style={[
              styles.tenureBut,
              tenure === "1W"
                ? { backgroundColor: "#FFF3D3" }
                : { backgroundColor: "black" },
            ]}
            onPress={() => {
              setTenure("1W");
            }}
            activeOpacity={1}
          >
            <Text
              style={[
                styles.tenureText,
                tenure === "1W" ? { color: "black" } : { color: "white" },
              ]}
            >
              1 W
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tenureBut,
              tenure === "1M"
                ? { backgroundColor: "#FFF3D3" }
                : { backgroundColor: "black" },
            ]}
            onPress={() => {
              setTenure("1M");
            }}
            activeOpacity={1}
          >
            <Text
              style={[
                styles.tenureText,
                tenure === "1M" ? { color: "black" } : { color: "white" },
              ]}
            >
              1 M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tenureBut,
              tenure === "6M"
                ? { backgroundColor: "#FFF3D3" }
                : { backgroundColor: "black" },
            ]}
            onPress={() => {
              setTenure("6M");
            }}
            activeOpacity={1}
          >
            <Text
              style={[
                styles.tenureText,
                tenure === "6M" ? { color: "black" } : { color: "white" },
              ]}
            >
              6 M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tenureBut,
              tenure === "1Y"
                ? { backgroundColor: "#FFF3D3" }
                : { backgroundColor: "black" },
            ]}
            onPress={() => {
              setTenure("1Y");
            }}
            activeOpacity={1}
          >
            <Text
              style={[
                styles.tenureText,
                tenure === "1Y" ? { color: "black" } : { color: "white" },
              ]}
            >
              1 Y
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tenureBut,
              tenure === "3Y"
                ? { backgroundColor: "#FFF3D3" }
                : { backgroundColor: "#1e1e1e" },
            ]}
            onPress={() => {
              setTenure("3Y");
            }}
            activeOpacity={1}
          >
            <Text
              style={[
                styles.tenureText,
                tenure === "3Y" ? { color: "black" } : { color: "white" },
              ]}
            >
              3 Y
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
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
  periodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 34,
  },
  separatorLine: {
    backgroundColor: "#3C3835",
    width: "100%",
    height: 1,
    marginLeft: 8,
    marginRight: 4,
    marginTop: 2,
  },
});

export default PriceGraph;
