import React, { useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { View, Text, StyleSheet } from "react-native";

const GenericBottomSheet = ({ bottomSheetRef, children, height = 20 }: any) => {
  const snapPoints = useMemo(() => ["10%", `${height}%`], []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        backgroundStyle={styles.bottomsheetBackground}
        handleIndicatorStyle={{ backgroundColor: "#979797", width: 64 }}
        enablePanDownToClose={true}
      >
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
const styles = StyleSheet.create({
  bottomsheetContainer: {
    position: "absolute",
    flex: 1,
    padding: 24,
    bottom: 0,
    backgroundColor: "#000000",
  },
  bottomsheetBackground: {
    backgroundColor: "#000000",
  },
});

export default GenericBottomSheet;
