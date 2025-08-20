import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { FC, useState } from 'react'
import CustomSafeAreaView from '@components/globalUi/customSafeAreaView'
import {deliveryPartnerLogin } from '@services/authService.ts'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { screenHeight } from '@utils/Scaling'
import LottieView from 'lottie-react-native'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomInput from '@components/ui/CustomInput'
import { RFValue } from 'react-native-responsive-fontsize'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import CustomButton from '@components/ui/CustomButton'

const DeliveryLogin:FC = () => {

  const [email,setEmail] =useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)

  const handelLogin = async()=>{
     setLoading(true)
       try {
        await deliveryPartnerLogin(email,password)
        resetAndNavigate('DeliveryPartnerDashboard')
        
       } catch (error) {
        console.log("DeliveryPartner",error)
       }finally{
         setLoading(false)
       }

  }

  return (
     <GestureHandlerRootView style={styles.rootContainer}>
     <CustomSafeAreaView>
    <ScrollView
    keyboardShouldPersistTaps='handled'
    keyboardDismissMode='on-drag'
    >
      <View style={styles.continer}>
        <View style={styles.lottieContainer}>
          <LottieView 
          autoPlay
          loop
          style={styles.lottie}
          source={require('@assets/animations/delivery_man.json')}
          hardwareAccelerationAndroid
          />
        </View>
        <CustomText
          variants='h3'
          fontFamily={Fonts.Bold}
          >
            Delivery Partner portal
          </CustomText>
          <CustomText
          variants='h6'
          style={styles.text}
          fontFamily={Fonts.SemiBold}
          >
            Faster than flash
          </CustomText>


          <CustomInput
          onChangeText={setEmail}
          value={email}
          left={<Icon 
            name='mail'
            color='#F8890E'
            style={{marginLeft:10}}
            size={RFValue(18)}
          />}
          placeholder='Email'
          inputMode='email'
          right={false}
          />

           <CustomInput
          onChangeText={setPassword}
          value={password}
          left={<Icon 
            name='key-sharp'
            color='#F8890E'
            style={{marginLeft:10}}
            size={RFValue(18)}
          />}
          placeholder='Password'
          secureTextEntry
          right={false}
          />

         <CustomButton 
         disable={false}
         title='Login'
         onPress={handelLogin}
         loading={loading}
         />
            
         

      </View>

    </ScrollView>
    </CustomSafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    flex:1
  },
     continer:{
      flex:1,
      padding:20,
      alignItems:'center'
     },
     lottieContainer:{
      height:screenHeight * 0.12,
      width:'100%'
     },
     lottie:{
      width:'100%',
      height:'100%'
     },
     text:{
      marginTop: 2,
      marginBottom:25,
      opacity:0.8

     }
})

export default DeliveryLogin