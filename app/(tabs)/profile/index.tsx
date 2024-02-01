import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import images from "../../../constants/images";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../../../global/store";
import { getInrWalletBalance } from "../../../services/wallet.service";
import { setWallet } from "../../../global/slices/wallet";

const ProfileScreen = () => {
  const profileData = useSelector((state: RootState) => state.profile);
  const router=useRouter();
  const dispatch=useDispatch();

  const {data: inrBalance, isSuccess} = useQuery({
    queryKey: ["inr-balance"],
    queryFn: () => getInrWalletBalance(profileData.userId)
  })

  if(isSuccess){
    dispatch(
      setWallet({
        inrBalance: inrBalance
      })
    );
  }

  const header = () => {
    return (
      <TouchableOpacity 
      style={styles.headerContainer} activeOpacity={0.7}
      onPress={() => {router.push('/profile/details')}}
      >
        <View style={{ flexDirection: "row", gap: 16 }}>
          <View style={styles.profileImage}>
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 25,
                lineHeight: 25,
                textAlign: "center",
              }}
            >
              {profileData.name?.charAt(0)}
            </Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.headerText1}>{profileData.name}</Text>
            <Text style={styles.headerText2}>Account details</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          activeOpacity={1}
        >
          <Image
            source={images.rightIcon2}
            style={{
              width: 16,
              height: 16,
              alignSelf: "center",
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const tabs = (
    title: string,
    logoIcon: any,
    prop: boolean,
    verifyIcon: any,
    subtitle?: string,
    onTilePress?: () => void
  ) => {
    return (
      <TouchableOpacity style={styles.tabContainer} activeOpacity={0.7} onPress={onTilePress}>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Image source={logoIcon} style={{ width: 16, height: 16 }} />
          <Text style={styles.tabText}>{title}</Text>
          <Text style={styles.tabText1}>{subtitle}</Text>
          {prop && (
            <Image source={verifyIcon} style={{ width: 18, height: 18 }} />
          )}
        </View>

        <Image
          source={images.rightIcon2}
          style={{ width: 12, height: 12, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    );
  };

  const seperator = () => {
    return (
      <View
        style={{
          borderBottomColor: "#979797",
          borderBottomWidth: 0.2,
          marginHorizontal: 14,
        }}
      ></View>
    );
  };

  const verifications = () => {
    return (
      <View style={styles.verifyContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.propHeaderText}>Verifications</Text>
          <View style={styles.verifyContainer2}>
            <Text style={styles.propContText}>In under 120 secs</Text>
          </View>
        </View>

        {tabs(
          "KYC Verification",
          images.kycCheck,
          true,
          profileData.kycVerified ? images.verified : images.notVerified,
          "",
          () => router.push("/profile/kyc")
        )}
        {seperator()}
        {tabs(
          "Bank Account Verification",
          images.currencyIcon,
          true,
          profileData.bavVerified ? images.verified : images.notVerified,
          "",
          () => router.push("/profile/bav")
        )}
      </View>
    );
  };

  const referEarn = () => {
    return (
      <View style={styles.referContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.propHeaderText}>Help us grow</Text>
          <View style={styles.verifyContainer2}>
            <Text style={styles.propContText}>100% Commission</Text>
          </View>
        </View>

        {tabs(
          "Refer & Earn (for lifetime)",
          images.referIcon,
          false,
          images.notVerified,
        )}
      </View>
    );
  };

  const transactions = () => {
    return (
      <View style={styles.transContainer}>
        <Text style={styles.propHeaderText}>Transactions</Text>

        {tabs(
          "INR Wallet ",
          images.walletIcon,
          false,
          images.notVerified,
          "(UPI Deposits Available)",
          () => router.push("/profile/wallet")
        )}
        {seperator()}
        {seperator()}
        {tabs(
          "All investment orders",
          images.ordersIcon,
          false,
          images.verified
        )}
      </View>
    );
  };

  const supportFeedback = () => {
    return (
      <View style={styles.transContainer}>
        <Text style={styles.propHeaderText}>Support & Feedback</Text>

        {tabs(
          "Help and Support",
          images.helpHeadset,
          false,
          images.notVerified
        )}
        {seperator()}
        {tabs("Talk to the founders", images.phoneIcon, false, images.verified)}
      </View>
    );
  };

  const footer = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 4,

            alignItems: "center",
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.footerText}>About us</Text>
          <Image
            source={images.whiteRightArrow}
            style={{ width: 6, height: 8, resizeMode: "stretch" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
          activeOpacity={0.7}
        >
          <Text style={styles.footerText}>FAQs</Text>
          <Image
            source={images.whiteRightArrow}
            style={{ width: 6, height: 8, resizeMode: "stretch" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
          activeOpacity={0.7}
        >
          <Text style={styles.footerText}>Log out</Text>
          <Image
            source={images.whiteRightArrow}
            style={{ width: 6, height: 8, resizeMode: "stretch" }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {header()}
      {verifications()}
      {referEarn()}
      {transactions()}
      {supportFeedback()}
      {footer()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: 16,
    marginTop: 48,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText1: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
  },
  headerText2: {
    color: "#979797",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
  },
  profileImage: {
    backgroundColor: "#9FE3D3",
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: "center",
  },
  verifyContainer: {
    marginHorizontal: 16,
    marginTop: 28,
    backgroundColor: "#343434",
    borderRadius: 6,
    paddingVertical:4
  },
  verifyContainer2: {
    backgroundColor: "#FFD76F",
    marginRight: 16,
    alignItems: "center",
    width: 120,
    height: 16,
    borderRadius: 5,
    top: -7,
  },
  propHeaderText: {
    padding: 10,
    color: "#979797",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 15,
  },
  tabContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  tabText: {
    color: "white",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 15,
  },
  tabText1: {
    color: "#FFD76F",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 13,
  },
  propContText: {
    color: "black",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 13,
    marginTop: 2
  },
  referContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "#343434",
    borderRadius: 6,
    paddingVertical:4
  },
  transContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "#343434",
    borderRadius: 6,
    paddingVertical:4
  },
  footer: {
    marginTop: 24,
    marginHorizontal: 16,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  footerText: {
    color: "white",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
  },
});

export default ProfileScreen;
