import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { setAuth } from '../../global/slices/auth'
import { setProfile } from '../../global/slices/profile'
import { useRouter } from 'expo-router'

const LoginScreen = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const router=useRouter();

    const handleLoginClick=async()=>{
        try{
            const user=await Auth.signIn(email, password);
            setAuth({
                accessToken: user.signInUserSession.accessToken.jwtToken,
                refreshToken: user.signInUserSession.refreshToken.jwtToken,
                idToken: user.signInUserSession.idToken.jwtToken,
                isValid: true
            });
            setProfile({
                email:user.attributes["email"],
                emailVerified: user.attributes["email_verified"],
                userId: user.attributes["sub"],
                name: user.attributes["custom:name"],
                kycVerified: user.attributes["custom:kycVerified"],
                bavVerified: user.attributes["custom:bavVerified"]
            });
            router.replace("/home");
        } catch(error){
            console.error(error)
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.text2}>Login</Text>
      <View style={styles.formContainer}>
      <TextInput 
      value={email}
      onChangeText={(val)=>setEmail(val)}
      style={styles.input}
      autoComplete='email'
      placeholder='Email'      
      />
      <TextInput 
      value={password}
      onChangeText={(val)=>setPassword(val)}
      style={styles.input}
      autoComplete='password'
      placeholder='Password'
      secureTextEntry={false}
      />
      <TouchableOpacity style={styles.buttonSecond} onPress={handleLoginClick}>
          <Text style={styles.text3}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        paddingVertical: 24,
        paddingHorizontal: 12,
      },
      formContainer:{
        marginTop:100
      },
    text2: {
        color: "#FFFFFF",
        fontWeight: "400",
        fontSize: 32,
        lineHeight: 44,
        textAlign: "center",
        marginTop: '15%'
      },
      input: {
        padding: 4,
        borderColor: "#FFD76F",
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        marginBottom: 20
      },
      text3: {
        color: "black",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 20,
      },
      buttonSecond: {
        backgroundColor: "#FFD76F",
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
      },
})