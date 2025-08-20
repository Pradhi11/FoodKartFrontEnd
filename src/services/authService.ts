import axios from 'axios'
import { BASE_URL } from './config'
import { tokenStorage } from '@states/storage'
import { useAuthStore } from '@states/authStore.ts'
import { Alert } from 'react-native'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { appAxios } from './apiInterceptors'

export const customerLogin = async (phone: string) => {
      try {
            const response = await axios.post(`${BASE_URL}/customer/login`, { phone: phone })
            console.log("Enterd........response..", response)

            const { accessToken, refreshToken, customer } = response.data
           


            tokenStorage.set("accessToken", accessToken)
            tokenStorage.set("refreshToken", refreshToken)
            const { setUser } = useAuthStore.getState()
            setUser(customer)
      } catch (error) {
            console.log("Enterd....customerLogin....error..", error)

            Alert.alert('Something went wrong')
      }
}


export const deliveryPartnerLogin = async (email: string, password: string) => {
      try {
            const response = await axios.post(`${BASE_URL}/delivery/login`, { email, password })
            console.log("Enterd........response..", response)

            const { accessToken, refreshToken, deliveryPartner } = response.data
            tokenStorage.set("accessToken", accessToken)
            tokenStorage.set("refreshToken", refreshToken)
            const { setUser } = useAuthStore.getState()
            setUser(deliveryPartner)
      } catch (error) {
            console.log("Enterd....DeliveryPartnerLogin....error..", error)

            Alert.alert('Something went wrong')
      }
}


export const  refreshTokens = async() => {
      try {
            const refreshToken = tokenStorage.getString("refreshToken")
            const response = await axios.post(`${BASE_URL}/refresh-token`,{refreshToken})
            const new_access_token = response.data.accessToken
            const new_refresh_token = response.data.refreshToken

            tokenStorage.set("accessToken", new_access_token)
            tokenStorage.set("refreshToken", new_refresh_token)
      } catch (error) {
            console.log("refreshToken error",error)
            tokenStorage.clearAll()
            resetAndNavigate("CustomerLogin")
      }
}

export const refechUser = async(setUser:any) =>{
      try {
         const response = await appAxios.get('/user')
            setUser(response.data.user)
            
      } catch (error) {

            console.log("refechUser error",error)
            
      }
}


export const updateUserLocation = async (data:any, setUser:any)=>{

      try {
            const response = await appAxios.patch('/user',data)
            refechUser(setUser)
            
      } catch (error) {
            console.log("updateUserLocation errror",error)
      }
}