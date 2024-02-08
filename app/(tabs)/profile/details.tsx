import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  InteractionManager,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../global/store";
import GenericHeader from "../../../components/GenericComponents/GenericHeader";
import { Auth } from "aws-amplify";
import { setProfile } from "../../../global/slices/profile";
import Separator from "../../../components/Separator";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

const ProfileDetailsScreen = () => {
  const {
    email: userEmail,
    name: userFullName,
    phone,
  } = useSelector((state: RootState) => state.profile);
  const [name, setName] = useState<string | undefined>(userFullName);
  const [editNameClicked, setEditNameClicked] = useState<boolean>(false);
  const nameInputRef = useRef<TextInput>(null);

  const dispatch = useDispatch();

  const handleUpdateName = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      await Auth.updateUserAttributes(user, {
        "custom:name": name,
      });
      const newUser = await Auth.currentAuthenticatedUser();
      dispatch(
        setProfile({
          email: newUser.attributes["email"],
          emailVerified: newUser.attributes["email_verified"],
          userId: newUser.attributes["sub"],
          name: newUser.attributes["custom:name"],
          kycVerified:
            newUser.attributes["custom:kycVerified"] == "Y" ? true : false,
          bankVerified:
            newUser.attributes["custom:bankVerified"] == "Y" ? true : false,
          phone: newUser.attributes["custom:phone"],
        })
      );
      setEditNameClicked(false);
    } catch (error) {
      console.error(error);
      setEditNameClicked(false);
    }
  };

  const handlePressEditName = () => {
    setEditNameClicked(true);
    nameInputRef?.current?.focus();
    InteractionManager.runAfterInteractions(() =>
      nameInputRef?.current?.focus()
    );
  };

  const handleCancelEditName = () => {
    setEditNameClicked(false);
    setName(userFullName);
  };

  const details = () => {
    return (
      <View style={{ marginTop: 28, paddingHorizontal: 16 }}>
        <View style={styles.heading}>
          <Text style={styles.text1}>Account Details</Text>
          {editNameClicked && (
            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.5}
              onPress={handleUpdateName}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabelText}>Full Name</Text>
          <View style={styles.inputIconContainer}>
            {editNameClicked ? (
              <TextInput
                value={name}
                onChangeText={(val) => setName(val)}
                style={styles.inputNormalText}
                ref={nameInputRef}
              />
            ) : (
              <Text style={styles.inputNormalText}>{userFullName}</Text>
            )}
            {editNameClicked ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleCancelEditName}
              >
                <Entypo name="cross" size={24} color="#FFD76F" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handlePressEditName}
              >
                <MaterialCommunityIcons
                  name="account-edit"
                  size={24}
                  color="#FFD76F"
                />
              </TouchableOpacity>
            )}
          </View>
          <Separator />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabelText}>Email Address</Text>
          <Text style={styles.inputNormalText}>{userEmail}</Text>
          <Separator />
          <Separator />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabelText}>Mobile Number</Text>
          <Text style={styles.inputNormalText}>{phone}</Text>
          <Separator />
          <Separator />
        </View>
      </View>
    );
  };

  return (
    <View>
      <GenericHeader showLogo />
      {details()}
    </View>
  );
};

export default ProfileDetailsScreen;

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 36,
  },
  text1: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 25,
  },
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  inputLabelText: {
    color: "#979797",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 15,
    marginTop: 10,
  },
  inputNormalText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 18,
    marginVertical: 8,
  },
  inputIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#FFD76F",
    borderRadius: 6,
    width: 68,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 8,
  },
  saveButtonText: {
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 17,
    color: "black",
  },
});
