import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Share,
} from "react-native";
import GenericHeader from "../../components/GenericComponents/GenericHeader";
import { AntDesign } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import ReferralService from "../../services/referral.services";
import { Referral } from "../../model/refer";
import { useSelector } from "react-redux";
import { RootState } from "../../global/store";

const ReferScreen = () => {
  const [details, setDetails] = useState<boolean>(false);
  const [copied, setCopied] = useState<string>("Copy Link");
  const [referLink, setReferLink] = useState<string>("");
  const [referDetails, setReferDetails] = useState<Referral | null>(null);
  const { kycVerified } = useSelector((state: RootState) => state.profile);

  const fetchData = async () => {
    const res = await ReferralService.getReferralDetails();
    setReferLink(`https://www.envest.money/?referralCode=${res?.referralCode}`);
    setReferDetails(res);
  };
  useEffect(() => {
    if (kycVerified) fetchData();
  }, []);

  const handleCopyLink = async () => {
    try {
      setCopied("Copied!!");
      await Clipboard.setStringAsync(referLink);
      setTimeout(() => {
        setCopied("Copy Link");
      }, 2000);
    } catch (error) {
      console.error();
    }
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: referLink,
      });
    } catch (error) {
      console.error();
    }
  };

  const referAd = () => (
    <View style={styles.adCont}>
      <Text style={styles.adText1}>EARN COMMISSION FOR A LIFETIME!</Text>
      <Text style={styles.adText2}>
        Refer & earn upto ₹1,00,000 with crypto’s biggest referral program.
      </Text>
    </View>
  );

  const referReward = () =>
    referDetails && (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 28,
          justifyContent: "space-between",
          marginHorizontal: 16,
          marginTop: 30,
        }}
      >
        <View style={{ gap: 4 }}>
          <Text style={styles.rewardText1}>Total Rewards Earned</Text>
          <Text style={styles.rewardText2}>
            ₹{referDetails.totalPotentialReferralEarnings.toFixed(2)}
          </Text>
        </View>
        <View style={{ gap: 4 }}>
          <Text style={styles.rewardText1}>Successful Referrals</Text>
          <Text style={styles.rewardText2}>
            {referDetails.succesfullReferrals}
          </Text>
        </View>
      </View>
    );

  const referNow = () => (
    <View style={{ marginHorizontal: 16, marginTop: 28, alignItems: "center" }}>
      <Text style={styles.referNowText1}>
        Refer and earn 100% commission paid by your referred friends for 4
        months and 20% thereafter, for lifetime!
      </Text>
      <Text style={[styles.referNowText2, { marginTop: 28 }]}> Refer Now!</Text>
      <View style={{ flexDirection: "row", marginTop: 12, height: 30 }}>
        <View
          style={{
            paddingHorizontal: 6,
            borderBottomLeftRadius: 8,
            borderTopLeftRadius: 8,
            borderColor: kycVerified ? "#535353" : "#3F3F3E",
            borderWidth: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.referNowText4,
              { color: kycVerified ? "#FFFFFF" : "#6D6D65" },
            ]}
          >
            {kycVerified ? referLink : "You are not eligible here..."}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: kycVerified ? "#FFD76F" : "#808080",
            borderBottomRightRadius: 8,
            borderTopRightRadius: 8,
            justifyContent: "center",
            paddingHorizontal: 6,
          }}
          onPress={handleCopyLink}
          disabled={!kycVerified}
        >
          <Text style={styles.referNowText3}>{copied}</Text>
        </TouchableOpacity>
      </View>
      {!kycVerified && (
        <Text
          style={{
            color: "#F23753",
            fontWeight: "500",
            fontSize: 12,
            textAlign: "center",
            marginTop: 12,
          }}
        >
          Complete your KYC to get the invite link.
        </Text>
      )}
    </View>
  );

  const referDetail = () => (
    <View style={{ marginHorizontal: 16, marginTop: 40, marginBottom: 100 }}>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={styles.detailText1}>
          More about Envest’s Referral Program:
        </Text>
        {!details && (
          <AntDesign
            name="down"
            size={20}
            color="#FFD76F"
            onPress={() => {
              setDetails(true);
            }}
          />
        )}
        {details && (
          <AntDesign
            name="up"
            size={20}
            color="#FFD76F"
            onPress={() => {
              setDetails(false);
            }}
          />
        )}
      </View>
      {details && (
        <View>
          <Text style={[styles.detailText3, { marginTop: 12 }]}>
            If you like what we have built then do share it with your friends
            and family. help them envest smarter, safer & simpler in crypto.
            {"\n"}In return keep earning their commission which is paid to
            envest for lifetime!{"\n"}
          </Text>
          <Text style={styles.detailText2}>What’s in it for you?</Text>
          <Text style={[styles.detailText3, { marginTop: 4 }]}>
            You will get 100% of the commission paid by your friend on all
            orders for the first 4 months.{"\n"}There after, you will get 20% of
            the commission your friends pays on all orders for a lifetime.
            {"\n"}Your friend wil also get ₹50 for using your referral link.
            {"\n"}
          </Text>
          <Text style={styles.detailText2}>
            Who is eligible for Envest's Referral Program?
          </Text>
          <Text style={[styles.detailText3, { marginTop: 4 }]}>
            Envest’s referral program is currently available only for the
            selected users. Envest decides who is eligible for referral by
            evaluating various factors. If you are not already eligible you
            might be soon.{"\n"}
          </Text>
          <Text style={styles.detailText2}>What is Successful referral?</Text>
          <Text style={[styles.detailText3, { marginTop: 4 }]}>
            Envest considers a referral successful only when your referred
            friend starts investing, Once he starts, the commission gets paid to
            you.{"\n"}
            However, your referred friends will receive ₹50 upon completing KYC
            & BAV.{"\n"}
          </Text>
          <Text style={styles.detailText2}>
            Why can’t i see my referral link?
          </Text>
          <Text style={[styles.detailText3, { marginTop: 4 }]}>
            You will get your referral link only when you have completed
            onboarding process, i.e KYC & BAV (Bank Account Verification).
          </Text>
        </View>
      )}
    </View>
  );
  const tabButtons = () => {
    return (
      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.tabBut2}
          activeOpacity={0.5}
          onPress={onShare}
        >
          <Text style={styles.tabText}>Invite a Friend</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
        <GenericHeader showLogo={false} />
      </View>
      <ScrollView>
        {referAd()}
        {referReward()}
        {referNow()}
        {referDetail()}
      </ScrollView>
      {tabButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  adCont: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "#B6B8EC",
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
    borderRadius: 12,
  },
  adText1: {
    color: "#FFD76F",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 2,
    textAlign: "center",
  },
  adText2: {
    color: "#FFF3D3",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },
  rewardText1: {
    color: "#FFF3D3",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 15,
  },
  rewardText2: {
    color: "#FFD76F",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
  },
  referNowText1: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 15,
  },
  referNowText2: {
    color: "#FFD76F",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
  referNowText3: {
    color: "#000000",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 13,
  },
  referNowText4: {
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 13,
  },
  detailText1: {
    color: "#FFD76F",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
  },
  detailText2: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 17,
  },
  detailText3: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 15,
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
});

export default ReferScreen;
