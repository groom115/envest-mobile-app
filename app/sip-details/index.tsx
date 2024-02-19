import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import images from "../../constants/images";
import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GenericBottomSheet from "../../components/GenericComponents/GenericBottomSheet";
import GenericHeader from "../../components/GenericComponents/GenericHeader";

const SipDetailsScreen = () => {
  const params = useLocalSearchParams();
  const sip = JSON.parse(params.sip as any);
  const cancelSipBottomSheetRef = useRef<BottomSheetModal>(null);
  const editSipBottomSheetRef = useRef<BottomSheetModal>(null);

  const [openOrderDetails, setOpenOrderDetails] = useState<boolean[]>(() =>
    Array(4).fill(false)
  );
  const handleToggle = (index: number) => {
    setOpenOrderDetails((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  };

  const cancelSipBottomSheet = () => {
    return (
      <GenericBottomSheet bottomSheetRef={cancelSipBottomSheetRef} height={23}>
        <View style={styles.bottomSheetCont}>
          <View>
            <Text style={styles.cancelBottomSheetText1}>
              Hey <Text style={{ color: "#FFD76F" }}>Krishna</Text>
            </Text>
            <Text style={styles.cancelBottomSheetText1}>
              Would you like to Cancel your SIP in Stable Crypto Basket?
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#FFF3D3",
              // marginTop: 28,
              alignItems: "center",
              alignSelf: "center",
              paddingVertical: 12,
              width: "100%",
              borderRadius: 6,
            }}
            activeOpacity={1}
          >
            <Text style={styles.cancelBottomSheetText2}>Cancel SIP</Text>
          </TouchableOpacity>
        </View>
      </GenericBottomSheet>
    );
  };

  const editSipBottomSheet = () => {
    return (
      <GenericBottomSheet bottomSheetRef={editSipBottomSheetRef} height={34}>
        <View style={styles.bottomSheetCont}>
          <Text style={styles.editBottomSheetText1}>
            Edit SIP Amount & Date
          </Text>
          <View style={styles.editBottomSheetCont}>
            <Text style={styles.editBottomSheetText2}>New SIP Amount</Text>
            <View style={styles.editBottomSheetTextBox}>
              <View style={styles.editBottomSheetIconBox}>
                <Text style={styles.editBottomSheetText3}>₹</Text>
              </View>

              <BottomSheetTextInput
                style={[
                  styles.editBottomSheetText3,
                  { width: 120, paddingVertical: 5 },
                ]}
              />
            </View>
          </View>
          <View style={styles.editBottomSheetCont}>
            <Text style={styles.editBottomSheetText2}>New SIP Date</Text>
            <View style={styles.editBottomSheetTextBox}>
              <View style={styles.editBottomSheetIconBox}>
                <Ionicons name="calendar-outline" size={20} color="#FFD76F" />
              </View>

              <BottomSheetTextInput
                style={[
                  styles.editBottomSheetText3,
                  { width: 120, paddingVertical: 5 },
                ]}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFF3D3",
              width: "100%",
              alignItems: "center",
              paddingVertical: 13,
              borderRadius: 6,
              marginTop: 28,
            }}
          >
            <Text style={styles.cancelBottomSheetText2}>Edit SIP</Text>
          </TouchableOpacity>
        </View>
      </GenericBottomSheet>
    );
  };

  const title = () => {
    return (
      <View style={{ marginTop: 28, paddingHorizontal: 16 }}>
        <Text style={styles.titleText1}>SIP Details</Text>
        <Text style={styles.titleText2}>₹{sip.amount}</Text>
        <Text style={styles.titleText3}>{params.basket}</Text>
      </View>
    );
  };

  const orders = (title: string, index: number) => (
    <TouchableOpacity
      style={styles.order2}
      activeOpacity={1}
      onPress={() => {
        handleToggle(index);
      }}
    >
      <Text style={styles.orderText1}>{title}</Text>
      {!openOrderDetails[index] ? (
        <Image
          source={images.whiteRightArrow}
          style={{
            width: 12,
            height: 12,
            alignSelf: "center",
            resizeMode: "contain",
          }}
        />
      ) : (
        <MaterialIcons name="keyboard-arrow-up" size={24} color="white" />
      )}
    </TouchableOpacity>
  );
  const sipDetails = () => {
    const date = new Date(sip.createdAt);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthName = monthNames[monthIndex];
    const formattedDate = `${day} ${monthName} ${year}`;

    return (
      <View style={styles.order1}>
        {orders("SIP Details", 0)}
        {openOrderDetails[0] && (
          <View style={styles.sipDetailCont}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ gap: 8 }}>
                <Text style={styles.sipText}>Date of SIP:</Text>
                <Text style={styles.sipText}>SIP ID:</Text>
                <Text style={styles.sipText}>SIP Amount:</Text>
                <Text style={styles.sipText}>SIP Start date:</Text>
              </View>
              <View style={{ gap: 8 }}>
                <Text style={styles.sipText2}>
                  {sip.sipSchedule}th of every month
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[styles.sipText2, { paddingRight: 5 }]}>
                    {sip.sipId}
                  </Text>
                  <FontAwesome5 name="copy" size={16} color="#979797" />
                </View>

                <Text style={styles.sipText2}>₹{sip.amount}</Text>
                <Text style={styles.sipText2}>{formattedDate}</Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.sipButton}
              onPress={() => {
                cancelSipBottomSheetRef.current?.present();
              }}
            >
              <Text style={styles.sipText3}>Cancel SIP</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const upcomingOrder = () => (
    <View style={styles.order1}>
      {orders("Upcoming orders", 1)}
      {openOrderDetails[1] && (
        <View style={styles.sipDetailCont}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                gap: 4,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MaterialCommunityIcons
                name="shield-outline"
                size={26}
                color="#F2C937"
              />
              <View style={styles.line} />
              <MaterialCommunityIcons
                name="shield-check"
                size={26}
                color="#28FFA4"
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={styles.upcomingOrderText}>
                  Your next SIP installment is on 19th Feb 2024.
                </Text>
                <View
                  style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
                >
                  <MaterialIcons name="error" size={12} color="#F2C937" />
                  <Text style={[styles.upcomingOrderText1, { marginTop: 4 }]}>
                    You don’t have sufficient wallet balance!
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.deposit}
                  // onPress={handleBackdropPress}
                >
                  <Text style={styles.upcomingOrderText}>Deposit INR</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.upcomingOrderText}>
                  Previous SIP installment on 19th Jan 2024.
                </Text>
                <Text style={[styles.upcomingOrderText1, { marginTop: 2 }]}>
                  Success
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const lapsedSIP = () => (
    <View style={styles.order1}>
      {orders("Lapsed SIP Installment", 2)}
      {openOrderDetails[2] && (
        <View style={styles.sipDetailCont}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                gap: 4,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MaterialCommunityIcons
                name="shield-outline"
                size={26}
                color="#F2C937"
              />
              <View style={styles.line} />
              <MaterialCommunityIcons
                name="shield-check"
                size={26}
                color="#28FFA4"
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={styles.upcomingOrderText}>
                  Your SIP installment on 19th Feb was Lapsed.
                </Text>
                <View
                  style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
                >
                  <MaterialIcons name="error" size={12} color="#F2C937" />
                  <Text style={[styles.upcomingOrderText1, { marginTop: 4 }]}>
                    SIP installment was lapsed due to insufficient balance
                  </Text>
                </View>
                <TouchableOpacity activeOpacity={1} style={styles.deposit}>
                  <Text style={styles.upcomingOrderText}>Retry Order</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.upcomingOrderText}>
                  Previous SIP installment on 19th Jan 2024.
                </Text>
                <Text style={[styles.upcomingOrderText1, { marginTop: 2 }]}>
                  Success
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const prevOrder = () => {
    return (
      <View style={styles.order1}>
        {orders("All previous orders", 3)}
        {openOrderDetails[3] && (
          <View style={styles.sipDetailCont}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View
                style={{
                  gap: 4,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <MaterialCommunityIcons
                  name="shield-check"
                  size={26}
                  color="#28FFA4"
                />
                <View style={styles.line} />
                <MaterialCommunityIcons
                  name="shield-check"
                  size={26}
                  color="#28FFA4"
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.upcomingOrderText}>
                    Your SIP installment on 19th Feb was Lapsed.
                  </Text>

                  <Text style={[styles.upcomingOrderText1, { marginTop: 4 }]}>
                    Success
                  </Text>
                </View>
                <View>
                  <Text style={styles.upcomingOrderText}>
                    Previous SIP installment on 19th Jan 2024.
                  </Text>
                  <Text style={[styles.upcomingOrderText1, { marginTop: 2 }]}>
                    Success
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };
  const orderDetails = () => (
    <View style={styles.orderContainer}>
      {sipDetails()}
      {upcomingOrder()}
      {lapsedSIP()}
      {prevOrder()}
    </View>
  );

  const tabButtons = () => (
    <View style={styles.tab}>
      <TouchableOpacity
        style={styles.tabBut2}
        onPress={() => {
          editSipBottomSheetRef.current?.present();
        }}
      >
        <Text style={styles.tabText}>Edit SIP</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#1e1e1e" }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <View style={{ paddingHorizontal: 16 }}>
              <GenericHeader />
            </View>
            {title()}
            {orderDetails()}
          </View>
        </ScrollView>
        {tabButtons()}
        {cancelSipBottomSheet()}
        {editSipBottomSheet()}
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  titleText1: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 25,
  },
  titleText2: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 20,
    marginTop: 28,
  },
  titleText3: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    marginTop: 4,
  },
  orderContainer: {
    marginTop: 20,
    borderTopColor: "#979797",
    borderTopWidth: 0.5,
  },
  order1: {
    borderBottomColor: "#979797",
    borderBottomWidth: 0.5,
  },
  order2: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderText1: {
    color: "#979797",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 17,
  },
  sipDetailCont: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  sipText: {
    color: "#979797",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
  },
  sipText2: {
    color: "white",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
  },
  sipText3: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 15,
  },
  sipButton: {
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 20,
    borderColor: "#FFD76F",
    borderWidth: 1,
    marginTop: 20,
    alignSelf: "flex-start",
  },
  line: {
    borderLeftColor: "#F2C937",
    borderLeftWidth: 1,
    height: 100,
    borderStyle: "dashed",
    flexDirection: "column",
  },
  upcomingOrderText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 15,
  },
  upcomingOrderText1: {
    color: "#979797",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 13,
  },
  deposit: {
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 5,
    borderColor: "#FFD76F",
    borderWidth: 1,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  tab: {
    width: "100%",
    position: "absolute",
    paddingHorizontal: 16,
    paddingVertical: 13,
    backgroundColor: "black",
    bottom: 0,
  },
  tabBut2: {
    borderRadius: 8,
    paddingVertical: 13,
    backgroundColor: "#FFF3D3",
    alignItems: "center",
    flex: 1,
  },
  tabText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
  },
  editBottomSheetCont: {
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  editBottomSheetTextBox: {
    borderWidth: 1,
    borderColor: "#FFD76F",
    backgroundColor: "#3F3F3E",
    flexDirection: "row",
    borderRadius: 6,
    alignItems: "center",
    height: 36,
  },
  editBottomSheetIconBox: {
    backgroundColor: "#2B2B2B",
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  editBottomSheetText1: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 17,
  },
  editBottomSheetText2: {
    color: "#C5C5C5",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
  },
  editBottomSheetText3: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  cancelBottomSheetText1: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
  },
  cancelBottomSheetText2: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
  },
  bottomSheetCont: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
});

export default SipDetailsScreen;
