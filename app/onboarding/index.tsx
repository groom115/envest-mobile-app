import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import OnBoardingItem from "../../components/OnBoardingItem";
import Paginator from "../../components/Paginator";
import { data } from "../../data/OnBoardingData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRouter} from 'expo-router'

interface AppProps {}

const OnBoardingScreen: React.FC<AppProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setCurrentIndex(viewableItems[0]?.index);
    }
  ).current;
  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const router=useRouter();

  const onFinishUserOnboarding=async()=>{
    await AsyncStorage.setItem('user-onboarding','true');

    router.replace('/home');
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          renderItem={({ item, index }) => <OnBoardingItem item={item} />}
          pagingEnabled
          showsHorizontalScrollIndicator
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={styles.conatiner2}>
        <Paginator data={data} scrollX={scrollX} />
        <TouchableOpacity style={styles.continueButton} onPress={onFinishUserOnboarding}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  continueButton: {
    flex: 1,
    backgroundColor: "#FFD76F",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    paddingVertical: 12,
  },
  conatiner2: {
    position: "absolute",
    bottom: 15,
    flex: 1,
    paddingHorizontal: 15,
    alignSelf: "center",
    left: 0,
    right: 0,
  },
});

export default OnBoardingScreen;
