import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import { navigationRef} from '@utils/NavigationUtils'
import SplashScreen from '@features/auth/SplashScreen'
import CustomerLogin from '@features/auth/CustomerLogin'
import DeliveryLogin from '@features/auth/DeliveryLogin'
import ProductDashboard from '@features/dashboard/ProductDashboard'
import DeliveryPartnerDashboard from '@features/deliverypartner/DeliveryPartnerDashboard'

const Stack = createNativeStackNavigator()

const Navigation:FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
      initialRouteName = 'SplashScreen'
      screenOptions={{
        headerShown:false
      }}
      >
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='ProductDashboard' component={ProductDashboard} />
            <Stack.Screen name='DeliveryPartnerDashboard' component={DeliveryPartnerDashboard} />

      <Stack.Screen 
      options={
       { animation : 'fade'}
      }
      name='CustomerLogin' 
      component={CustomerLogin} 
      />
      <Stack.Screen 
      name='DeliveryLogin'
       component={DeliveryLogin} 
       />

      
      </Stack.Navigator>
    </NavigationContainer>
  )
}



export default Navigation